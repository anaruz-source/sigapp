# 🗺️ Carte Interactive des Communes du Moyen Atlas (Maroc)

Application web interactive de visualisation des communes du Moyen Atlas au Maroc, avec données GeoJSON enrichies (population, superficie, forêts).

![React](https://img.shields.io/badge/React-18.2-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff?logo=vite)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Fonctionnalités

- 🗺️ **Carte interactive** avec Leaflet et React-Leaflet
- 📊 **Statistiques en temps réel** - Population, superficie, densité
- 🎨 **Design moderne et responsive** - Fonctionne sur tous les appareils
- 🌲 **Données enrichies** - Population, superficie totale, superficie forestière
- 🔍 **Popups informatifs** - Cliquez sur une commune pour voir ses détails
- 🖨️ **Bouton d'impression** - Exportez la carte
- ⚡ **100% Frontend** - Aucun serveur backend requis
- 🚀 **Déployable sur GitHub Pages** - Hébergement gratuit

## 📸 Aperçu

L'application affiche:
- Une carte interactive avec les limites des communes
- Des statistiques globales (nombre de communes, population totale, etc.)
- Des couleurs par densité de population
- Des popups avec les détails de chaque commune au clic
- Des tooltips avec le nom de la commune au survol

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+ et npm

### Installation et Lancement

```bash
# Cloner le dépôt
git clone https://github.com/VOTRE_USERNAME/sigapp.git
cd sigapp/frontend

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

Ouvrir http://localhost:3000 dans votre navigateur.

### Build de Production

```bash
cd frontend
npm run build
```

Le build sera généré dans `frontend/dist/`.

## 📤 Déploiement sur GitHub Pages

Consultez le guide complet dans **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

### Résumé rapide:

1. **Créer un dépôt GitHub** nommé `sigapp`
2. **Pousser le code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/VOTRE_USERNAME/sigapp.git
   git push -u origin main
   ```
3. **Activer GitHub Pages** dans Settings → Pages → Source: GitHub Actions
4. Le site sera disponible à: `https://VOTRE_USERNAME.github.io/sigapp/`

Le workflow GitHub Actions (`.github/workflows/deploy.yml`) déploiera automatiquement à chaque push.

## 📁 Structure du Projet

```
sigapp/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Workflow GitHub Actions
├── frontend/
│   ├── public/
│   │   └── data/
│   │       └── communes.geojson  # Données GeoJSON
│   ├── src/
│   │   ├── components/
│   │   │   └── CommuneMap.jsx    # Composant de la carte
│   │   ├── App.jsx               # Composant principal
│   │   ├── App.css               # Styles
│   │   └── main.jsx              # Point d'entrée
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── README.md
└── DEPLOYMENT.md                 # Guide de déploiement
```

## 🛠️ Technologies Utilisées

- **[React](https://react.dev/)** - Librairie UI
- **[Vite](https://vitejs.dev/)** - Build tool moderne et rapide
- **[Leaflet](https://leafletjs.com/)** - Librairie de cartes interactives
- **[React-Leaflet](https://react-leaflet.js.org/)** - Composants React pour Leaflet
- **[GeoJSON](https://geojson.org/)** - Format de données géographiques

## 📊 Sources de Données

- **Données Géographiques**: GADM 2015 (v2.8) - Global Administrative Areas, Niveau 4 administratif
- **Source**: Stanford University EarthWorks - Limites administratives du Maroc
- **Système de coordonnées**: WGS84 (EPSG:4326)
- **Données statistiques**: Données internes enrichies - Population, superficie, forêts

## 🔧 Développement

### Commandes Disponibles

```bash
npm run dev      # Lancer le serveur de développement
npm run build    # Compiler pour la production
npm run preview  # Prévisualiser le build de production
```

### Modifier les Données

Pour mettre à jour les données GeoJSON:

1. Remplacer `frontend/public/data/communes.geojson`
2. Les statistiques seront automatiquement recalculées côté client
3. Rebuild et redéployer

### Personnalisation

- **Styles**: Modifier `frontend/src/App.css`
- **Carte**: Modifier `frontend/src/components/CommuneMap.jsx`
- **Couleurs**: Ajuster les gradients et palettes dans les fichiers CSS/JSX
- **Config Vite**: Modifier `frontend/vite.config.js` (notamment le `base` pour GitHub Pages)

## 📝 Configuration GitHub Pages

Le fichier `vite.config.js` est configuré avec:

```javascript
base: '/sigapp/'
```

⚠️ **Important**: Si vous changez le nom du dépôt GitHub, changez aussi cette valeur pour qu'elle corresponde.

Pour un domaine personnalisé, utilisez:

```javascript
base: '/'
```

## 🤝 Contribution

Les contributions sont les bienvenues! N'hésitez pas à:

1. Forker le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commiter vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pousser vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteur

Créé avec ❤️ pour la visualisation des communes du Moyen Atlas

## 🙏 Remerciements

- GADM pour les données géographiques
- Stanford University EarthWorks
- La communauté Leaflet et React

---

**🎉 Bonne visualisation de données!**
