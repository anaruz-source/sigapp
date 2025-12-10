import { useState, useEffect, useRef } from 'react';
import CommuneMap from './components/CommuneMap';
import PrintButton from './components/PrintButton';
import './App.css';

/**
 * Fonction pour calculer les statistiques à partir du GeoJSON
 * Function to calculate statistics from GeoJSON data
 */
function calculateStats(geojsonData) {
    if (!geojsonData || !geojsonData.features) return null;

    let total_population = 0;
    let total_area = 0;
    let total_forest = 0;
    const communes = [];

    geojsonData.features.forEach(feature => {
        const props = feature.properties || {};
        total_population += props.population || 0;
        total_area += props.superficie_totale_km2 || 0;
        total_forest += props.superficie_forestiere_ha || 0;
        communes.push(props.commune_name || 'Unknown');
    });

    const avg_density = total_area > 0 ? total_population / total_area : 0;

    return {
        communes_count: geojsonData.features.length,
        total_population,
        total_area: parseFloat(total_area.toFixed(2)),
        total_forest_area: total_forest,
        average_density: parseFloat(avg_density.toFixed(2)),
        communes
    };
}

/**
 * Composant principal de l'application
 * Main application component
 */
function App() {
    const [geojsonData, setGeojsonData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        // Charger les données GeoJSON depuis le dossier public
        const fetchData = async () => {
            try {
                setLoading(true);

                // Récupérer les données GeoJSON depuis le dossier public
                // Utilisation de import.meta.env.BASE_URL pour gérer le préfixe de l'URL (ex: /sigapp/)
                const baseUrl = import.meta.env.BASE_URL.endsWith('/')
                    ? import.meta.env.BASE_URL
                    : import.meta.env.BASE_URL + '/';
                const geoJsonUrl = `${baseUrl}data/communes.geojson`;

                console.log('Chargement GeoJSON depuis:', geoJsonUrl);
                const response = await fetch(geoJsonUrl);
                if (!response.ok) {
                    throw new Error(`Impossible de charger les données GeoJSON (${response.status})`);
                }
                const data = await response.json();
                setGeojsonData(data);

                // Calculer les statistiques localement
                const calculatedStats = calculateStats(data);
                setStats(calculatedStats);

                setLoading(false);
            } catch (err) {
                console.error('Erreur lors du chargement des données:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="app">
                <div className="loading-screen">
                    <div className="loading-content">
                        <div className="spinner-large"></div>
                        <h2>Chargement des données...</h2>
                        <p>Préparation de la carte interactive des communes</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="app">
                <div className="error-screen">
                    <div className="error-content">
                        <div className="error-icon">⚠️</div>
                        <h2>Erreur de chargement</h2>
                        <p>{error}</p>
                        <p className="error-hint">Impossible de charger les données. Vérifiez que les fichiers sont correctement déployés.</p>
                        <button onClick={() => window.location.reload()} className="retry-button">
                            Réessayer
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="app">
            {/* En-tête */}
            <header className="app-header">
                <div className="header-content">
                    <h1 className="app-title">
                        <span className="title-icon">🗺️</span>
                        Communes du Maroc
                    </h1>
                    <p className="app-subtitle">Visualisation Interactive - Région du Moyen Atlas</p>
                </div>

                {stats && (
                    <div className="stats-bar">
                        <div className="stat-box">
                            <span className="stat-number">{stats.communes_count}</span>
                            <span className="stat-label">🏘️ Communes</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-number">{stats.total_population?.toLocaleString('fr-FR')}</span>
                            <span className="stat-label">👥 Population Totale</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-number">{stats.total_area?.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} km²</span>
                            <span className="stat-label">📏 Superficie Totale</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-number">{stats.total_forest_area?.toLocaleString('fr-FR')} ha</span>
                            <span className="stat-label">🌲 Superficie Forestière</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-number">{stats.average_density?.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} hab/km²</span>
                            <span className="stat-label">📊 Densité Moyenne</span>
                        </div>
                    </div>
                )}
            </header>

            {/* Carte */}
            <main className="app-main" ref={mapRef}>
                <CommuneMap geojsonData={geojsonData} />
            </main>

            {/* Bouton d'impression */}
            <PrintButton mapRef={mapRef} />

            {/* Pied de page */}
            <footer className="app-footer">
                <div className="footer-content">
                    <p>
                        Données : Communes territoriales du Maroc |
                        Créé avec React & Leaflet
                    </p>
                    <h3>📚 Références et Sources de Données</h3>
                    <div className="references">
                        <div className="reference-item">
                            <strong>Données Géographiques:</strong> GADM 2015 (v2.8) - Global Administrative Areas, Niveau 4 administratif
                        </div>
                        <div className="reference-item">
                            <strong>Source:</strong> Stanford University EarthWorks - Limites administratives du Maroc
                        </div>
                        <div className="reference-item">
                            <strong>Système de coordonnées:</strong> WGS84 (EPSG:4326)
                        </div>
                        <div className="reference-item">
                            <strong>Données statistiques:</strong> Données internes enrichies - Population, superficie, forêts
                        </div>
                    </div>
                    <p className="footer-note">© 2024 - Application de visualisation des communes du Moyen Atlas</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
