/**
 * Formatte un nombre avec la notation française (virgule comme séparateur décimal)
 * Format a number with French notation (comma as decimal separator)
 */
export const formatNumberFrench = (num) => {
    if (num === null || num === undefined || isNaN(num)) {
        return '0';
    }

    // Convertir en string avec séparateur décimal point
    const str = num.toFixed(2);

    // Séparer partie entière et décimale
    const [integerPart, decimalPart] = str.split('.');

    // Ajouter espaces tous les 3 chiffres pour la partie entière
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    // Remplacer le point par une virgule et retourner
    if (decimalPart && parseFloat('0.' + decimalPart) > 0) {
        return `${formattedInteger},${decimalPart}`;
    }

    return formattedInteger;
};

/**
 * Formatte un nombre entier avec la notation française (espaces comme séparateur de milliers)
 * Format an integer with French notation (spaces as thousand separator)
 */
export const formatIntegerFrench = (num) => {
    if (num === null || num === undefined || isNaN(num)) {
        return '0';
    }

    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

/**
 * Obtient une couleur basée sur la densité de population
 * Get a color based on population density
 */
export const getDensityColor = (density) => {
    if (density > 80) return '#e74c3c'; // Rouge vif - High density
    if (density > 50) return '#e67e22'; // Orange - Medium-high density
    if (density > 30) return '#f39c12'; // Orange clair - Medium density
    if (density > 15) return '#f1c40f'; // Jaune - Low-medium density
    return '#2ecc71'; // Vert - Low density
};

/**
 * Obtient une couleur avec opacité basée sur la densité
 * Get a color with opacity based on density
 */
export const getDensityColorWithOpacity = (density, opacity = 0.6) => {
    const color = getDensityColor(density);
    // Convertir hex en RGB et ajouter l'opacité
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
