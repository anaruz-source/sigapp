import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './PrintButton.css';

/**
 * Bouton d'impression pour la carte
 * Print button for the map
 */
const PrintButton = ({ mapRef }) => {
    const handlePrint = useReactToPrint({
        content: () => mapRef.current,
        documentTitle: 'Carte des Communes du Maroc - Moyen Atlas',
        pageStyle: `
      @page {
        size: A4 landscape;
        margin: 10mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `
    });

    const handleDownloadPDF = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/download/carte-pdf');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'carte_communes_maroc.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Erreur lors du téléchargement du PDF:', error);
            alert('Le PDF n\'est pas disponible. Veuillez générer la carte imprimable d\'abord.');
        }
    };

    const handleDownloadPNG = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/download/carte-png');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'carte_communes_maroc.png';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Erreur lors du téléchargement du PNG:', error);
            alert('Le PNG n\'est pas disponible. Veuillez générer la carte imprimable d\'abord.');
        }
    };

    return (
        <div className="print-button-container">
            <button className="print-button" onClick={handlePrint} title="Imprimer la carte">
                <span className="print-icon">🖨️</span>
                Imprimer
            </button>
            <button className="print-button download-btn" onClick={handleDownloadPDF} title="Télécharger PDF">
                <span className="print-icon">📄</span>
                PDF
            </button>
            <button className="print-button download-btn" onClick={handleDownloadPNG} title="Télécharger PNG">
                <span className="print-icon">🖼️</span>
                PNG
            </button>
        </div>
    );
};

export default PrintButton;
