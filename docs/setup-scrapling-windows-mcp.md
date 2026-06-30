# Configurer Scrapling comme serveur MCP sur Windows (local)

Ce guide explique comment configurer Scrapling en local sur ton PC Windows
et le brancher à Claude Code via MCP. Cette étape n'a pas pu être faite
depuis le container cloud (pas d'accès à ta machine), donc à exécuter
toi-même, dans **PowerShell** ou **l'invite de commandes (cmd)**.

Chemin de l'exécutable utilisé dans ce guide (à adapter si différent chez
toi) :

```
C:\Users\maxen\AppData\Local\Python\pythoncore-3.14-64\Scripts\scrapling.exe
```

## 1. Vérifier que Scrapling fonctionne

```powershell
"C:\Users\maxen\AppData\Local\Python\pythoncore-3.14-64\Scripts\scrapling.exe" --help
```

Tu dois voir la liste des commandes (`extract`, `install`, `mcp`, `shell`).
Si la commande échoue, va directement à la section [Erreurs possibles](#7-erreurs-possibles-et-solutions).

Si c'est la première utilisation, installe aussi les navigateurs nécessaires
aux fetchers dynamiques (Playwright/Chromium) :

```powershell
"C:\Users\maxen\AppData\Local\Python\pythoncore-3.14-64\Scripts\scrapling.exe" install
```

## 2. Tester le serveur MCP en standalone

```powershell
"C:\Users\maxen\AppData\Local\Python\pythoncore-3.14-64\Scripts\scrapling.exe" mcp
```

Le serveur doit démarrer et rester actif dans le terminal (il attend des
connexions MCP). Ferme-le avec `Ctrl+C` une fois que tu as confirmé qu'il
démarre sans erreur — Claude Code le relancera lui-même automatiquement
quand on l'aura configuré à l'étape 4.

## 3. Vérifier que Claude Code est installé

```powershell
claude --version
```

Si la commande n'est pas reconnue, installe ou répare l'installation de
Claude Code avant de continuer (voir [Erreurs possibles](#7-erreurs-possibles-et-solutions)).

## 4. Ajouter Scrapling comme serveur MCP dans Claude Code

```powershell
claude mcp add scrapling "C:\Users\maxen\AppData\Local\Python\pythoncore-3.14-64\Scripts\scrapling.exe" mcp
```

Cette commande enregistre Scrapling comme serveur MCP nommé `scrapling`,
lancé via `scrapling.exe mcp` à chaque session Claude Code.

## 5. Vérifier la configuration

```powershell
claude mcp list
```

Tu dois voir une entrée `scrapling` pointant vers le bon exécutable, avec
un statut connecté/disponible.

## 6. Tester dans Claude Code

Démarre une session Claude Code (`claude`) dans ton projet, puis demande :

```
Utilise Scrapling pour récupérer le titre de https://www.casselin.com/fr/
```

Claude Code doit passer par le serveur MCP Scrapling pour faire la requête
et te renvoyer le titre de la page.

## 7. Erreurs possibles et solutions

### `'scrapling' n'est pas reconnu en tant que commande interne...`

Le dossier `Scripts` n'est pas dans le `PATH` Windows, ou tu n'as pas
utilisé le chemin complet.

**Solutions :**
- Utilise toujours le chemin complet entre guillemets (comme dans ce guide)
  tant que le `PATH` n'est pas corrigé.
- Pour corriger durablement : ajoute
  `C:\Users\maxen\AppData\Local\Python\pythoncore-3.14-64\Scripts` à la
  variable d'environnement `PATH` (Paramètres système avancés > Variables
  d'environnement > `Path` > Modifier > Nouveau), puis rouvre un nouveau
  terminal.
- Vérifie aussi avec `where scrapling` une fois le PATH modifié.

### `'claude' n'est pas reconnu en tant que commande interne...`

Claude Code n'est pas installé, ou son dossier d'installation n'est pas
dans le `PATH`.

**Solutions :**
- Réinstalle Claude Code en suivant la documentation officielle
  (https://code.claude.com).
- Si déjà installé, retrouve le dossier d'installation (souvent
  `%APPDATA%\npm` si installé via npm, ou le dossier indiqué par
  l'installeur) et ajoute-le au `PATH` comme ci-dessus.
- Ferme et rouvre ton terminal après toute modification du `PATH`
  (les variables d'environnement ne sont relues qu'à l'ouverture d'un
  nouveau terminal).

### Problème de PATH Windows en général

**Solutions :**
- Liste les chemins actuels : `echo %PATH%` (cmd) ou `$env:Path` (PowerShell).
- Ajoute un nouveau chemin sans écraser l'existant (toujours utiliser
  "Nouveau" dans l'éditeur de variables, jamais remplacer toute la valeur).
- Redémarre le terminal (et VS Code/l'IDE si utilisé) après modification.
- En dépannage rapide, le chemin complet entre guillemets fonctionne
  toujours sans toucher au PATH.

### Problème Python / pip

Symptômes : `pip` introuvable, version de Python incorrecte, conflit entre
plusieurs installations Python.

**Solutions :**
- Vérifie la version active : `python --version` et `pip --version`.
- Si plusieurs Python sont installés, utilise le lanceur explicite :
  `py -3.14 -m pip show scrapling`.
- Réinstalle proprement si besoin :
  ```powershell
  py -3.14 -m pip install --upgrade "scrapling[fetchers]"
  ```
- Si `pip` n'est pas reconnu mais Python oui : `python -m ensurepip --upgrade`.

### Problème Playwright / Chromium (si `DynamicFetcher` est utilisé)

Symptômes : erreur `Executable doesn't exist`, ou navigateur introuvable
lors de l'utilisation de `DynamicFetcher` (fetcher avec navigateur complet).

**Solutions :**
- Installe les navigateurs Scrapling/Playwright :
  ```powershell
  "C:\Users\maxen\AppData\Local\Python\pythoncore-3.14-64\Scripts\scrapling.exe" install
  ```
- Si l'erreur persiste, force la réinstallation de Chromium via Playwright
  directement :
  ```powershell
  py -3.14 -m playwright install chromium
  ```
- Vérifie qu'aucun antivirus/pare-feu ne bloque le téléchargement ou
  l'exécution du binaire Chromium téléchargé (dossier typique :
  `%USERPROFILE%\AppData\Local\ms-playwright`).
- En dernier recours, utilise le `Fetcher` simple (HTTP, sans navigateur)
  plutôt que `DynamicFetcher` si le site cible ne nécessite pas
  l'exécution de JavaScript.

## Une fois la configuration validée

Quand `claude mcp list` montre `scrapling` connecté et que le test de
l'étape 6 fonctionne, tu pourras demander à Claude Code en local
d'utiliser Scrapling directement (sans passer par `requests` comme dans le
script du container cloud), y compris avec `DynamicFetcher` si certaines
pages Casselin nécessitent du JavaScript.
