"""Small, respectful Scrapling-based audit scraper for casselin.com product pages.

Goal: gather a real, small sample of product data (homepage -> one category ->
up to 3 product pages) to support a future premium redesign of the product
sheets. This is NOT a crawler: it touches a handful of pages, waits between
requests, and stops after PRODUCT_LIMIT products.

Network notes (this execution environment):
- Scrapling's `Fetcher` (curl_cffi/TLS impersonation) and `DynamicFetcher`
  (Playwright/Chromium) both fail to establish HTTPS connections through this
  sandbox's outbound proxy. Plain `requests` works fine here.
- To still use Scrapling for what it's good at (CSS/XPath/adaptive parsing),
  pages are fetched with `requests` and the HTML is handed to Scrapling's
  `Selector` class for all extraction. On a machine without this proxy
  restriction, swap `_get_selector()` to use `Fetcher.get(...).css(...)`
  directly -- the rest of the script is unchanged.
"""

from __future__ import annotations

import json
import time
from dataclasses import asdict, dataclass, field
from pathlib import Path
from urllib.parse import urljoin

import requests
from scrapling.parser import Selector

BASE_URL = "https://www.casselin.com/fr/"
CATEGORY_URL = "https://www.casselin.com/fr/13042-armoire-negative"  # one leaf category, found via homepage nav
PRODUCT_LIMIT = 3
REQUEST_DELAY_SECONDS = 2.0  # be polite, don't hammer the site
TIMEOUT = 20

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; CasselinAuditBot/1.0; +internal product-page audit)",
    "Accept-Language": "fr-FR,fr;q=0.9",
}

OUTPUT_PATH = Path(__file__).resolve().parent.parent / "data" / "casselin_products_sample.json"


@dataclass
class Product:
    url: str
    title: str | None = None
    reference: str | None = None
    price: str | None = None
    main_image: str | None = None
    gallery_images: list[str] = field(default_factory=list)
    technical_specs: dict[str, str] = field(default_factory=dict)
    documents: list[dict[str, str]] = field(default_factory=list)
    breadcrumb: list[str] = field(default_factory=list)
    related_products: list[dict[str, str]] = field(default_factory=list)


def _get_selector(url: str) -> Selector:
    """Fetch a page with requests and parse it with Scrapling's Selector."""
    response = requests.get(url, headers=HEADERS, timeout=TIMEOUT)
    response.raise_for_status()
    return Selector(response.text, url=response.url)


def find_category_links(home_selector: Selector) -> list[str]:
    """Find top-level category links from the homepage navigation."""
    links = home_selector.css("a::attr(href)").getall()
    categories = {
        link
        for link in links
        if link and link.startswith(BASE_URL) and link.rstrip("/") != BASE_URL.rstrip("/")
        and "/content/" not in link and "/module/" not in link
    }
    return sorted(categories)


def find_product_links(category_selector: Selector, limit: int) -> list[str]:
    """Find product detail links on a category/subcategory listing page."""
    links = category_selector.css(".product-miniature a::attr(href)").getall()
    seen: list[str] = []
    for link in links:
        if link and link.endswith(".html") and link not in seen:
            seen.append(link)
        if len(seen) >= limit:
            break
    return seen


def extract_breadcrumb(selector: Selector) -> list[str]:
    return [t.strip() for t in selector.css(".breadcrumb .breadcrumb-item a::text, .breadcrumb .breadcrumb-item span::text").getall() if t.strip()]


def extract_technical_specs(selector: Selector) -> dict[str, str]:
    """PrestaShop's standard features table, when present on a product page."""
    specs: dict[str, str] = {}
    rows = selector.css(".data-sheet .data-sheet-item")
    for row in rows:
        name = row.css(".name::text").get()
        value = row.css(".value::text").get()
        if name and value:
            specs[name.strip()] = value.strip()
    return specs


def extract_documents(selector: Selector) -> list[dict[str, str]]:
    docs = []
    for link in selector.css(".product-attachments-block a.attachment-file, .product-attachments-block a.attachment-file-step"):
        href = link.css("::attr(href)").get()
        label = link.css("::text").get()
        if href:
            docs.append({"label": (label or "").strip(), "url": href})
    return docs


def extract_related_products(selector: Selector) -> list[dict[str, str]]:
    related = []
    for card in selector.css(".product-cover-link"):
        href = card.css("::attr(href)").get()
        if href:
            related.append({"url": href})
    # dedupe while preserving order
    seen_urls = set()
    deduped = []
    for item in related:
        if item["url"] not in seen_urls:
            seen_urls.add(item["url"])
            deduped.append(item)
    return deduped


def scrape_product(url: str) -> Product:
    selector = _get_selector(url)

    title = selector.css("h1.page-heading::text").get()
    reference = selector.css('meta[itemprop="sku"]::attr(content)').get()
    price = selector.css(".product-prices .product-price::text").get()

    main_image = selector.css(".product-cover img::attr(src)").get()
    gallery_images = [
        src
        for src in selector.css("#js-zoom-gallery img::attr(data-image-large-src)").getall()
        if src
    ]
    if not gallery_images and main_image:
        gallery_images = [main_image]

    return Product(
        url=url,
        title=title.strip() if title else None,
        reference=reference,
        price=price.strip() if price else None,
        main_image=main_image,
        gallery_images=gallery_images,
        technical_specs=extract_technical_specs(selector),
        documents=extract_documents(selector),
        breadcrumb=extract_breadcrumb(selector),
        related_products=extract_related_products(selector)[:6],
    )


def main() -> None:
    print(f"[1/4] Fetching homepage: {BASE_URL}")
    home_selector = _get_selector(BASE_URL)
    time.sleep(REQUEST_DELAY_SECONDS)

    print(f"[2/4] Fetching category page: {CATEGORY_URL}")
    category_selector = _get_selector(CATEGORY_URL)
    time.sleep(REQUEST_DELAY_SECONDS)

    product_links = find_product_links(category_selector, PRODUCT_LIMIT)
    if not product_links:
        raise RuntimeError("No product links found on the category page; selectors may need updating.")
    print(f"[3/4] Found {len(product_links)} product link(s), scraping up to {PRODUCT_LIMIT}:")
    for link in product_links:
        print(f"  - {link}")

    products: list[Product] = []
    for link in product_links[:PRODUCT_LIMIT]:
        print(f"    fetching {link}")
        products.append(scrape_product(link))
        time.sleep(REQUEST_DELAY_SECONDS)

    print(f"[4/4] Writing {len(products)} product(s) to {OUTPUT_PATH}")
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "source": BASE_URL,
        "category_sampled": CATEGORY_URL,
        "product_count": len(products),
        "products": [asdict(p) for p in products],
    }
    OUTPUT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print("Done.")


if __name__ == "__main__":
    main()
