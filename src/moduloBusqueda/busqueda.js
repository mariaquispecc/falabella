// Constante declarativa reutilizable para sanitización XSS
const REGEX_XSS = /<[^>]*>/g;

/**
 * Motor de Búsqueda y Filtros con sanitización integrada
 */
function buscarProducto(termino, catalogo) {
    if (!termino || !termino.trim()) {
        return { procesado: false, redireccionar: false, productos: [] };
    }

    const terminoSanitizado = termino.replace(REGEX_XSS, "").trim();

    if (!terminoSanitizado) {
        return { htmlSanitizado: "", productos: [], estadoVacio: true };
    }

    const productosFiltrados = catalogo.filter(({ nombre }) =>
        nombre.toLowerCase().includes(terminoSanitizado.toLowerCase())
    );

    if (productosFiltrados.length === 0) {
        return {
            htmlSanitizado: terminoSanitizado,
            productos: [],
            paginaSinResultados: true,
            estadoVacio: true,
            sugerencias: ['Tecnología', 'Moda Hombre', 'Calzado Deportivo']
        };
    }

    return {
        htmlSanitizado: terminoSanitizado,
        productos: productosFiltrados,
        totalResultados: productosFiltrados.length,
        procesado: true
    };
}
/**
 * Gestiona de forma segura los parámetros económicos desde la URL de Falabella
 */
function gestionarFiltroURL(urlStr) {
    try {
        const { searchParams } = new URL(urlStr);
        
        // Conversión segura de tipos; si falla la conversión o es NaN, recurre al valor por defecto
        const minPrecio = parseInt(searchParams.get('minPrecio'), 10) || 0;
        const maxPrecio = parseInt(searchParams.get('maxPrecio'), 10) || 1000;

        return { minPrecio, maxPrecio, errorServidor: false };
    } catch {
        return { minPrecio: 0, maxPrecio: 1000, errorServidor: true };
    }
}
module.exports = { buscarProducto, gestionarFiltroURL };