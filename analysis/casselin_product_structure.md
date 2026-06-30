# Structure des fiches produit Casselin — analyse pour le redesign premium

Échantillon analysé : 3 fiches produit de la catégorie *Armoire négative*
(https://www.casselin.com/fr/13042-armoire-negative), extraites via
`scraper/casselin_scraper.py` et stockées dans
`data/casselin_products_sample.json`.

## 1. Plateforme

Le site casselin.com tourne sur **PrestaShop** (thème custom, gabarits
`.product-*`, blocs `Elementor` en header/footer). Les URLs produit suivent
le motif PrestaShop classique :

```
https://www.casselin.com/fr/{id}-{slug}-{ean13}.html
```

Les catégories suivent :

```
https://www.casselin.com/fr/{id}-{slug}
```

## 2. Structure HTML des fiches produit

| Bloc | Sélecteur CSS utile | Donnée |
|---|---|---|
| Titre | `h1.page-heading` | Nom du produit |
| Référence | `meta[itemprop="sku"]::attr(content)` ou `span.reference` | Référence fabricant (ex. `CAN200LB`) |
| Prix | `.product-prices .product-price` (`itemprop="price"`, attribut `content` = valeur numérique brute) | Prix TTC affiché |
| Image principale | `.product-cover img::attr(src)` | Visuel hero |
| Galerie | `#js-zoom-gallery img::attr(data-image-large-src)` (liste de `<li class="thumb-container">`) | Toutes les variantes/angles disponibles |
| Téléchargement HD | `a.download_image::attr(href)` | Lien image haute résolution |
| Fil d'Ariane | `.breadcrumb .breadcrumb-item a, .breadcrumb .breadcrumb-item span` | Accueil > Nos produits > Froid > Armoire négative > {produit} |
| Documents | `.product-attachments-block a.attachment-file` / `a.attachment-file-step` | Fiche technique PDF, Notice PDF, fichier STEP (CAO) |
| Produits similaires | `.product-cover-link::attr(href)` (carrousel "produits associés") | Jusqu'à 6+ liens vers produits proches |
| Description courte | `#product-description-short-{id}` | Texte marketing court |
| Description longue | `.product-description` | Souvent vide sur les fiches testées |
| Caractéristiques techniques | `.data-sheet .data-sheet-item` (`.name` / `.value`) | **Absent sur les 3 fiches testées** (catégorie "Froid") |

## 3. Données réellement disponibles dans l'échantillon

Pour les 3 produits testés (armoires négatives 200L/235L) :

- URL, titre, référence, prix : **présents et fiables**.
- Image principale + galerie : présentes, mais la galerie ne contient
  souvent **qu'une seule image** par produit dans cette catégorie (pas de
  vues multiples systématiques).
- Documents PDF : **systématiquement présents** (fiche technique + notice
  + fichier STEP), avec une convention de nommage stable basée sur la
  référence produit (`/fiche/fr/{ref}.pdf`, `/notice/{ref}-notice.pdf`,
  `/step/{ref}-step.zip`).
- Fil d'Ariane : présent et complet (5 niveaux).
- Produits similaires : présents, sous forme de liens uniquement (pas de
  prix/titre extraits dans le script actuel, facilement ajoutables si
  besoin).
- Caractéristiques techniques structurées (dimensions, puissance,
  alimentation, etc.) : **absentes du HTML** pour cette catégorie. Ces
  informations existent probablement seulement dans le PDF "Fiche
  technique", pas dans une table HTML exploitable automatiquement.

## 4. Limites observées

1. **Pas de tableau de caractéristiques HTML** sur les fiches testées —
   contrairement au standard PrestaShop (`.data-sheet`), cette boutique ne
   semble pas utiliser les "Features" du back-office pour cette catégorie.
   À vérifier sur d'autres catégories (ex. cuisson, lavage) avant de
   conclure que c'est général au site.
2. **Galerie limitée à 1 image** sur les produits testés — la structure
   HTML supporte plusieurs images (`<li class="thumb-container">`
   répétable), mais le contenu réel n'en propose qu'une dans cet
   échantillon.
3. **Pas de description longue** exploitable (`.product-description` vide
   dans l'échantillon) — seule la description courte est utilisée.
4. **Spécifications techniques uniquement en PDF** : pour obtenir
   dimensions, puissance, capacité, etc. de façon structurée, il faudrait
   soit parser les PDF "Fiche technique" (hors scope de ce script), soit
   les ressaisir manuellement pour le redesign.
5. Le site n'a pas nécessité de navigateur (`DynamicFetcher`) : le HTML
   est rendu côté serveur, donc un simple fetch HTTP suffit. `DynamicFetcher`
   n'a pas été nécessaire ni testé en conditions réelles ici (voir note
   technique dans le script sur les contraintes réseau de l'environnement
   d'exécution).

## 5. Recommandations pour la fiche produit premium

1. **Structurer la donnée produit en amont** : créer un référentiel interne
   (CSV/JSON/CMS) avec titre, référence, prix, caractéristiques techniques
   et documents, alimenté manuellement ou en parsant les PDF "Fiche
   technique" — le scraping seul ne suffit pas pour les specs techniques.
2. **Réutiliser systématiquement les documents PDF existants** (fiche
   technique, notice, STEP) : ils sont déjà disponibles avec une convention
   de nommage stable par référence, faciles à relier à chaque fiche
   produit redesignée.
3. **Renforcer la galerie visuelle** : la structure HTML le permet déjà
   (liste de vignettes avec image moyenne/grande/HD), mais le contenu réel
   manque d'images pour beaucoup de produits. Prioriser l'enrichissement
   photo (plusieurs angles, contexte d'usage CHR) avant le redesign visuel.
2. **S'appuyer sur le fil d'Ariane existant** pour la navigation
   contextuelle (catégorie / sous-catégorie) dans la nouvelle fiche produit.
4. **Exploiter les produits similaires** déjà calculés par PrestaShop pour
   une section "Vous aimerez aussi" sobre et pertinente, en charte premium.
5. **Prix et référence sont fiables et prêts à l'emploi** tels quels —
   aucune transformation nécessaire avant affichage.
6. Étendre l'échantillon (au-delà des 3 pages de test, dans un second
   temps et avec accord explicite) à d'autres catégories (cuisson,
   lavage, mobilier) avant de généraliser ces conclusions à tout le
   catalogue, car la présence de specs techniques structurées peut varier
   d'une catégorie à l'autre.
