# 🚀 Déploiement sur GitHub Pages

Ce projet est une application web autonome affichant une carte interactive des communes du Moyen Atlas (Maroc).

## 📦 Structure du Projet

```
sigapp/
├── frontend/           # Application React + Vite
│   ├── dist/          # Build de production (généré)
│   ├── public/        # Fichiers statiques
│   │   └── data/
│   │       └── communes.geojson
│   ├── src/
│   └── package.json
└── README.md
```

## 🛠️ Compilation Locale

Le projet a déjà été compilé, mais voici comment le recompiler si nécessaire:

```bash
cd frontend
npm install
npm run build
```

Le build se trouve dans `frontend/dist/`.

---

## 📤 Déploiement sur GitHub Pages

### Option 1: Déploiement Automatique avec GitHub Actions (Recommandé)

#### Étape 1: Préparer le dépôt

1. **Créer un nouveau dépôt sur GitHub** (ex: `sigapp`)
   - Aller sur https://github.com/new
   - Nommer le dépôt `sigapp` (ou un autre nom)
   - Ne pas initialiser avec README, .gitignore ou license

2. **Initialiser Git localement** (si pas déjà fait):
   ```bash
   cd /home/anaruz/sigapp
   git init
   ```

3. **Créer un fichier `.gitignore`**:
   ```bash
   cat > .gitignore << 'EOF'
   # Dependencies
   node_modules/
   
   # Build output
   dist/
   .cache/
   
   # Logs
   *.log
   npm-debug.log*
   
   # OS files
   .DS_Store
   Thumbs.db
   
   # IDE
   .vscode/
   .idea/
   *.swp
   *.swo
   
   # Environment
   .env
   .env.local
   EOF
   ```

4. **Ajouter et commiter les fichiers**:
   ```bash
   git add .
   git commit -m "Initial commit: Frontend autonome pour GitHub Pages"
   ```

5. **Lier le dépôt distant et pousser**:
   ```bash
   # Remplacer 'VOTRE_USERNAME' par votre nom d'utilisateur GitHub
   git remote add origin https://github.com/VOTRE_USERNAME/sigapp.git
   git branch -M main
   git push -u origin main
   ```

#### Étape 2: Configurer GitHub Actions

1. **Créer le workflow GitHub Actions**:
   ```bash
   mkdir -p .github/workflows
   cat > .github/workflows/deploy.yml << 'EOF'
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: "pages"
     cancel-in-progress: false

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         
         - name: Setup Node.js
           uses: actions/setup-node@v4
           with:
             node-version: '20'
             cache: 'npm'
             cache-dependency-path: frontend/package-lock.json
         
         - name: Install dependencies
           run: |
             cd frontend
             npm ci
         
         - name: Build
           run: |
             cd frontend
             npm run build
         
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: frontend/dist

     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   EOF
   ```

2. **Commiter et pousser le workflow**:
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Actions workflow for deployment"
   git push
   ```

#### Étape 3: Activer GitHub Pages

1. Aller sur votre dépôt GitHub: `https://github.com/VOTRE_USERNAME/sigapp`
2. Cliquer sur **Settings** (Paramètres)
3. Dans le menu de gauche, cliquer sur **Pages**
4. Sous **Source**, sélectionner **GitHub Actions**
5. Attendre quelques minutes que le déploiement se termine

#### Étape 4: Vérifier le déploiement

Votre site sera accessible à:
```
https://VOTRE_USERNAME.github.io/sigapp/
```

⚠️ **Important**: Le chemin `/sigapp/` correspond au `base: '/sigapp/'` dans `vite.config.js`. Si vous changez le nom du dépôt, modifiez aussi cette valeur.

---

### Option 2: Déploiement Manuel

Si vous préférez déployer manuellement sans GitHub Actions:

1. **Installer `gh-pages`**:
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

2. **Ajouter des scripts dans `package.json`**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Déployer**:
   ```bash
   npm run deploy
   ```

4. **Configurer GitHub Pages**:
   - Aller dans Settings → Pages
   - Sélectionner la branche `gh-pages` comme source
   - Cliquer sur Save

---

## ⚙️ Configuration Avancée

### Changer le nom du dépôt

Si vous utilisez un nom différent de `sigapp`, modifiez `frontend/vite.config.js`:

```javascript
export default defineConfig({
    base: '/NOUVEAU_NOM/',  // Remplacer par votre nom de dépôt
    // ...
})
```

### Domaine personnalisé

Pour utiliser un domaine personnalisé (ex: `communes.example.com`):

1. Modifier `vite.config.js`:
   ```javascript
   base: '/',  // Utiliser / au lieu de /sigapp/
   ```

2. Créer un fichier `frontend/public/CNAME`:
   ```
   communes.example.com
   ```

3. Configurer votre DNS pour pointer vers GitHub Pages

---

## 🧪 Tester Localement

Pour tester le build de production localement:

```bash
cd frontend
npm run preview
```

Ouvrir http://localhost:4173 dans votre navigateur.

---

## 📊 Caractéristiques

✅ **Application 100% Frontend** - Aucun serveur backend requis  
✅ **Données GeoJSON intégrées** - Chargées depuis le dossier public  
✅ **Carte Interactive Leaflet** - Zoom, popups, tooltips  
✅ **Statistiques calculées côté client** - Population, superficie, densité  
✅ **Responsive Design** - Fonctionne sur mobile et desktop  
✅ **Performant** - Build optimisé avec Vite  

---

## 🔧 Maintenance

### Mettre à jour les données GeoJSON

1. Remplacer `frontend/public/data/communes.geojson`
2. Rebuild: `npm run build`
3. Commit et push: Git mettra automatiquement à jour le site

### Modifier le design

1. Éditer les fichiers dans `frontend/src/`
2. Tester: `npm run dev`
3. Compiler: `npm run build`
4. Déployer: Push vers GitHub

---

## 📝 Notes Importantes

- **Taille du GeoJSON**: Le fichier `communes.geojson` est servi statiquement. Pour de très gros fichiers, considérez la compression gzip.
- **Cache**: GitHub Pages peut mettre en cache les fichiers. Force-refresh (Ctrl+F5) si les changements n'apparaissent pas.
- **HTTPS**: GitHub Pages fournit automatiquement HTTPS.
- **Limites**: GitHub Pages a une limite de 1GB par dépôt et 100GB de bande passante par mois.

---

## 🆘 Dépannage

### Le site affiche une page blanche

- Vérifiez que `base` dans `vite.config.js` correspond au nom du dépôt
- Vérifiez la console du navigateur pour les erreurs

### Les données ne se chargent pas

- Vérifiez que `frontend/public/data/communes.geojson` existe
- Vérifiez les chemins dans la console réseau du navigateur

### Le workflow GitHub Actions échoue

- Vérifiez les logs dans l'onglet Actions du dépôt
- Assurez-vous que GitHub Pages est activé dans les settings

---

## 📚 Ressources

- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Vite Documentation](https://vitejs.dev/)
- [React Leaflet](https://react-leaflet.js.org/)
- [Leaflet](https://leafletjs.com/)

---

**🎉 Votre application est maintenant prête à être déployée sur GitHub Pages!**
