# ⚡ Guide de Démarrage Rapide

## 🎯 Résumé

Votre application est maintenant **100% frontend**, sans backend Flask. Tout fonctionne côté navigateur!

## 📋 Ce qui a été fait

✅ Backend Flask supprimé  
✅ Frontend rendu autonome (charge le GeoJSON localement)  
✅ Statistiques calculées côté client  
✅ Application compilée et prête pour GitHub Pages  
✅ Workflow GitHub Actions configuré  
✅ Documentation complète créée  

## 🚀 Tester Localement

### Option 1: Script de démarrage (recommandé)

```bash
./start-dev.sh
```

### Option 2: Commandes manuelles

```bash
cd frontend
npm install  # Si pas déjà fait
npm run dev
```

Ouvrir http://localhost:3000

## 📦 Compiler pour la Production

### Option 1: Script de build

```bash
./build.sh
```

### Option 2: Commandes manuelles

```bash
cd frontend
npm run build
npm run preview  # Pour tester le build
```

Build généré dans `frontend/dist/`

## 🌐 Déployer sur GitHub Pages

### Méthode Rapide (Recommandée)

1. **Créer un dépôt GitHub** nommé `sigapp`

2. **Pousser le code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Application autonome"
   git remote add origin https://github.com/VOTRE_USERNAME/sigapp.git
   git branch -M main
   git push -u origin main
   ```

3. **Activer GitHub Pages**:
   - Aller sur https://github.com/VOTRE_USERNAME/sigapp/settings/pages
   - Sous "Source", sélectionner **"GitHub Actions"**
   - Attendre ~2 minutes

4. **Accéder à votre site**:
   ```
   https://VOTRE_USERNAME.github.io/sigapp/
   ```

Le workflow dans `.github/workflows/deploy.yml` déploiera automatiquement à chaque push!

### Configuration

⚠️ **Important**: Le `base: '/sigapp/'` dans `vite.config.js` doit correspondre au nom de votre dépôt.

Si vous nommez votre dépôt différemment (ex: `communes-maroc`), modifiez:

```javascript
// frontend/vite.config.js
base: '/communes-maroc/',
```

## 📁 Structure Finale

```
sigapp/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Déploiement automatique
├── frontend/
│   ├── public/
│   │   └── data/
│   │       └── communes.geojson  # Données GeoJSON
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
├── README.md                   # Documentation principale
├── DEPLOYMENT.md               # Guide de déploiement complet
├── QUICKSTART.md              # Ce fichier
├── start-dev.sh               # Script de démarrage rapide
└── build.sh                   # Script de compilation
```

## 🎨 Personnalisation

### Changer le titre ou les textes

Modifier `frontend/src/App.jsx`:

```javascript
<h1 className="app-title">
    Votre Nouveau Titre
</h1>
```

### Modifier les couleurs

Modifier `frontend/src/App.css` - les couleurs principales sont définies en haut du fichier.

### Mettre à jour les données

Remplacer `frontend/public/data/communes.geojson` et rebuild.

## 🆘 Dépannage

### Page blanche après déploiement

➜ Vérifiez que `base` dans `vite.config.js` correspond au nom du dépôt

### Données ne chargent pas

➜ Vérifiez que `frontend/public/data/communes.geojson` existe

### Erreurs de compilation

➜ Supprimez `node_modules` et réinstallez:
```bash
cd frontend
rm -rf node_modules
npm install
```

## 📚 Documentation Complète

- **README.md** - Vue d'ensemble et fonctionnalités
- **DEPLOYMENT.md** - Guide détaillé de déploiement (2 méthodes)
- **QUICKSTART.md** - Ce fichier

## ✨ Prochaines Étapes Suggérées

1. ✅ Tester localement avec `./start-dev.sh`
2. ✅ Vérifier que tout fonctionne
3. ✅ Compiler avec `./build.sh`
4. ✅ Créer un dépôt GitHub
5. ✅ Pousser le code
6. ✅ Activer GitHub Pages
7. ✅ Partager votre site!

## 🎉 C'est tout!

Votre application est maintenant:
- ✅ Autonome (pas de backend)
- ✅ Compilée
- ✅ Prête pour GitHub Pages
- ✅ Documentée

**Bon déploiement! 🚀**
