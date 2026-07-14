// tests/busqueda.test.js
const { buscarProducto, gestionarFiltroURL } = require('../../src/moduloBusqueda/busqueda');

describe('Módulo HU-003: Búsqueda y Filtros (Falabella)', () => {
    const catalogoMock = [
        { id: '1', nombre: 'Zapatilla Nike Air', categoria: 'Calzado', marca: 'Nike', precio: 299, stock: 5 },
        { id: '2', nombre: 'Polera Adidas Urbana', categoria: 'Vestir', marca: 'Adidas', precio: 150, stock: 2 }
    ];

    test('TC-007: CA-3.1 - Búsqueda exitosa con término existente', () => {
        const resultado = buscarProducto('Zapatilla', catalogoMock);
        expect(resultado.productos).toHaveLength(1);
        expect(resultado.productos[0].nombre).toContain('Zapatilla');
        expect(resultado.totalResultados).toBe(1);
    });

    test('TC-008: CA-3.5 - Búsqueda con campo completamente vacío', () => {
        const resultado = buscarProducto('', catalogoMock);
        expect(resultado.procesado).toBe(false);
        expect(resultado.redireccionar).toBe(false);
    });

    test('TC-009: CA-3.2 - Sanitización de scripts y caracteres maliciosos (XSS)', () => {
        const scriptMalicioso = "<script>alert('xss')</script>";
        const resultado = buscarProducto(scriptMalicioso, catalogoMock);
        expect(resultado.productos).toHaveLength(0);
        expect(resultado.htmlSanitizado).not.toContain('<script>');
        expect(resultado.estadoVacio).toBe(true);
    });

    test('TC-010: CA-3.3 - Modificación manual de parámetros inválidos en la URL de precios', () => {
        const urlCorrupta = 'https://www.falabella.com.pe/search?minPrecio=abc&maxPrecio=xyz';
        const filtrosValidados = gestionarFiltroURL(urlCorrupta);
        expect(filtrosValidados.minPrecio).toBe(0); // Cae en el fallback por defecto de forma segura
        expect(filtrosValidados.errorServidor).toBe(false);
    });

    test('TC-020: CA-3.4 - Búsqueda con término inexistente en el catálogo', () => {
        const resultado = buscarProducto('xqz99productofalso', catalogoMock);
        expect(resultado.productos).toHaveLength(0);
        expect(resultado.paginaSinResultados).toBe(true);
        expect(resultado.sugerencias.length).toBeGreaterThan(0);
    });
});
