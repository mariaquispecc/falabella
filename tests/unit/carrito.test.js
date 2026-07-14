// tests/carrito.test.js
const { agregarAlCarrito, actualizarCantidad, eliminarProducto } = require('../../src/moduloCarrito/carrito');
describe('Módulo HU-004: Carrito de Compras (Falabella)', () => {
    let carritoMock;
    const productoTextil = { id: 'A1', nombre: 'Casaca Denim', categoria: 'Vestir', stock: 3 };

    beforeEach(() => {
        carritoMock = [];
    });

    test('TC-011: CA-4.1 - Adición exitosa de producto estándar con stock', () => {
        const res = agregarAlCarrito(productoTextil, carritoMock, { talla: 'M' }, 1);
        expect(res.carrito).toHaveLength(1);
        expect(res.contadorVisual).toBe(1);
        expect(res.popupConfirmacion).toBe(true);
    });

    test('TC-012: CA-4.2 - Intento de adición de calzado o ropa omitiendo variante obligatoria', () => {
        const res = agregarAlCarrito(productoTextil, carritoMock, {}, 1); // Variante vacía
        expect(res.adicionPermitida).toBe(false);
        expect(res.resaltarSelectorRojo).toBe(true);
    });

    test('TC-014: CA-4.3 - Validación de decremento bajo la cantidad mínima permitida (< 1)', () => {
        carritoMock = [{ productoId: 'A1', cantidad: 1 }];
        const res = actualizarCantidad('A1', 0, carritoMock, productoTextil.stock); // Intento bajar a 0
        expect(res.cantidadFinal).toBe(1); // Bloquea en el mínimo permitido de 1
        expect(res.botonDecrementoBloqueado).toBe(true);
    });

    test('TC-015: CA-4.4 - Validación de incremento sobre la cantidad máxima permitida por stock', () => {
        carritoMock = [{ productoId: 'A1', cantidad: 3 }];
        const res = actualizarCantidad('A1', 4, carritoMock, productoTextil.stock); // Supera el stock de 3
        expect(res.adicionPermitida).toBe(false);
        expect(res.alertaInventario).toBe(true);
    });

    test('TC-013: CA-4.5 - Vaciar carrito completamente y verificar estado vacío', () => {
        carritoMock = [{ productoId: 'A1', cantidad: 1 }];
        const res = eliminarProducto('A1', carritoMock);
        expect(res.carrito).toHaveLength(0);
        expect(res.mensajeAlerta).toBe('Tu carrito está vacío');
        expect(res.contadorBolsa).toBe(0);
    });
});