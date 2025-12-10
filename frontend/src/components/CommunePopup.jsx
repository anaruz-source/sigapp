import { Popup } from 'react-leaflet';
import { formatNumberFrench, formatIntegerFrench } from '../utils/formatters';
import './CommunePopup.css';

/**
 * Composant Popup pour afficher les informations d'une commune
 * Popup component to display commune information
 */
const CommunePopup = ({ commune }) => {
    const props = commune.properties;

    return (
        <Popup className="commune-popup">
            <div className="popup-content">
                <h3 className="commune-name">{props.commune_name || 'Commune'}</h3>

                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="stat-icon">👥</span>
                        <div className="stat-details">
                            <span className="stat-label">Population</span>
                            <span className="stat-value">{formatIntegerFrench(props.population)}</span>
                        </div>
                    </div>

                    <div className="stat-item">
                        <span className="stat-icon">📏</span>
                        <div className="stat-details">
                            <span className="stat-label">Superficie Totale</span>
                            <span className="stat-value">{formatNumberFrench(props.superficie_totale_km2)} km²</span>
                        </div>
                    </div>

                    <div className="stat-item">
                        <span className="stat-icon">🌲</span>
                        <div className="stat-details">
                            <span className="stat-label">Superficie Forestière</span>
                            <span className="stat-value">{formatIntegerFrench(props.superficie_forestiere_ha)} ha</span>
                        </div>
                    </div>

                    <div className="stat-item highlight">
                        <span className="stat-icon">📊</span>
                        <div className="stat-details">
                            <span className="stat-label">Densité de Population</span>
                            <span className="stat-value density">{formatNumberFrench(props.densite_habitants_km2)} hab/km²</span>
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default CommunePopup;
