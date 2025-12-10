#!/bin/bash

# Script de démarrage rapide pour l'application
# Quick start script for the application

set -e

echo "🚀 Démarrage de l'application Communes du Moyen Atlas"
echo "=================================================="
echo ""

# Se déplacer dans le dossier frontend
cd "$(dirname "$0")/frontend"

# Vérifier si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
    echo "✅ Dépendances installées"
    echo ""
fi

# Vérifier si le GeoJSON existe
if [ ! -f "public/data/communes.geojson" ]; then
    echo "⚠️  ATTENTION: Le fichier communes.geojson n'existe pas!"
    echo "   Assurez-vous que public/data/communes.geojson est présent."
    exit 1
fi

echo "🌐 Lancement du serveur de développement..."
echo "   URL: http://localhost:3000"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""

npm run dev
