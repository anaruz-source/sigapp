import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import { getDensityColor } from '../utils/formatters';
import CommunePopup from './CommunePopup';
import './CommuneMap.css';

/**
 * Composant carte interactive pour visualiser les communes marocaines
 * Interactive map component to visualize Moroccan communes
 */
const CommuneMap = ({ geojsonData }) => {
    // Centre de la carte sur le Moyen Atlas
    const center = [32.8, -5.2];
    const zoom = 9;

    /**
     * Style pour chaque commune basé sur la densité de population
     * Style for each commune based on population density
     */
    const communeStyle = (feature) => {
        const density = feature.properties.densite_habitants_km2 || 0;

        return {
            fillColor: getDensityColor(density),
            fillOpacity: 0.6,
            color: '#ffffff',
            weight: 2,
            opacity: 1,
        };
    };

    /**
     * Gestion des événements pour chaque commune
     * Handle events for each commune
     */
    const onEachCommune = (feature, layer) => {
        // Effet de survol
        layer.on({
            mouseover: (e) => {
                const layer = e.target;
                const density = feature.properties.densite_habitants_km2 || 0;

                layer.setStyle({
                    fillColor: getDensityColor(density),
                    fillOpacity: 0.8,
                    weight: 3,
                    color: '#f39c12',
                });
            },
            mouseout: (e) => {
                const layer = e.target;
                const density = feature.properties.densite_habitants_km2 || 0;

                layer.setStyle({
                    fillColor: getDensityColor(density),
                    fillOpacity: 0.6,
                    weight: 2,
                    color: '#ffffff',
                });
            },
        });
    };

    if (!geojsonData || !geojsonData.features || geojsonData.features.length === 0) {
        return (
            <div className="map-loading">
                <div className="loading-content">
                    <div className="spinner"></div>
                    <p>Chargement de la carte...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="map-container">
            <MapContainer center={center} zoom={zoom} className="leaflet-map">
                {/* Couche de tuiles (fond de carte) */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Couche GeoJSON des communes */}
                {geojsonData.features.map((feature, index) => (
                    <GeoJSON
                        key={index}
                        data={feature}
                        style={communeStyle}
                        onEachFeature={onEachCommune}
                    >
                        <Popup>
                            <CommunePopup commune={feature} />
                        </Popup>
                    </GeoJSON>
                ))}
            </MapContainer>

            {/* Légende */}
            <div className="map-legend">
                <h4>Densité de population (hab/km²)</h4>
                <div className="legend-items">
                    <div className="legend-item">
                        <span className="legend-color" style={{ background: '#2ecc71' }}></span>
                        <span>0 - 15</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-color" style={{ background: '#f1c40f' }}></span>
                        <span>15 - 30</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-color" style={{ background: '#f39c12' }}></span>
                        <span>30 - 50</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-color" style={{ background: '#e67e22' }}></span>
                        <span>50 - 80</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-color" style={{ background: '#e74c3c' }}></span>
                        <span>&gt; 80</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommuneMap;
