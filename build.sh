#!/bin/bash

# Script pour compiler et prévisualiser le build de production
# Script to build and preview production build

set -e

echo "🔨 Compilation de l'application pour la production"
echo "=================================================="
echo ""

cd "$(dirname "$0")/frontend"

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
    echo ""
fi

# Compiler
echo "⚙️  Compilation en cours..."
npm run build

echo ""
echo "✅ Compilation terminée!"
echo ""
echo "📦 Build généré dans: frontend/dist/"
echo ""

# Afficher la taille du build
if [ -d "dist" ]; then
    echo "📊 Taille du build:"
    du -sh dist
    echo ""
fi

# Proposer de prévisualiser
read -p "🌐 Voulez-vous prévisualiser le build? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 Démarrage du serveur de prévisualisation..."
    echo "   URL: http://localhost:4173/sigapp/"
    echo ""
    echo "Appuyez sur Ctrl+C pour arrêter"
    echo ""
    npm run preview
fi

echo ""
echo "💡 Pour déployer sur GitHub Pages:"
echo "   1. Commitez et poussez vers GitHub"
echo "   2. Le workflow GitHub Actions déploiera automatiquement"
echo "   3. Voir DEPLOYMENT.md pour plus de détails"
echo ""
