// Configuración de negocio para el control de inventario y variantes
const CATEGORIAS_CON_TALLA = ['Vestir', 'Calzado'];
const LIMITE_MINIMO_COMPRA = 1;

/**
 * Añade productos a la bolsa preservando la inmutabilidad del estado
 */
function agregarAlCarrito(producto, carrito, variantes, cantidad) {
    const requiereTalla = CATEGORIAS_CON_TALLA.includes(producto.categoria);
    
    if (requiereTalla && !variantes.talla) {
        return { adicionPermitida: false, resaltarSelectorRojo: true, carrito };
    }

    // Clonamos el carrito original agregando el nuevo ítem sin mutar la referencia original
    const nuevoCarrito = [...carrito, { productoId: producto.id, variantes, cantidad }];
    
    return {
        carrito: nuevoCarrito,
        contadorVisual: nuevoCarrito.reduce((total, item) => total + item.cantidad, 0),
        popupConfirmacion: true,
        adicionPermitida: true
    };
}

/**
 * Modifica las cantidades respetando los topes físicos de stock y mínimos comerciales
 */
function actualizarCantidad(productoId, nuevaCantidad, carrito, stockDisponible) {
    const itemExistente = carrito.find(item => item.productoId === productoId);
    
    if (!itemExistente) return { carrito };

    if (nuevaCantidad < LIMITE_MINIMO_COMPRA) {
        return { cantidadFinal: itemExistente.cantidad, botonDecrementoBloqueado: true, adicionPermitida: false };
    }

    if (nuevaCantidad > stockDisponible) {
        return { cantidadFinal: itemExistente.cantidad, alertaInventario: true, adicionPermitida: false };
    }

    // Mapeo inmutable para actualizar la propiedad cantidad del ítem específico
    const carritoActualizado = carrito.map(item => 
        item.productoId === productoId ? { ...item, cantidad: nuevaCantidad } : item
    );

    return { cantidadFinal: nuevaCantidad, adicionPermitida: true, carrito: carritoActualizado };
}

/**
 * Remueve un producto del carrito utilizando filtrado no destructivo
 */
function eliminarProducto(productoId, carrito) {
    const carritoFiltrado = carrito.filter(item => item.productoId !== productoId);
    const esCarritoVacio = carritoFiltrado.length === 0;

    return {
        carrito: carritoFiltrado,
        contadorBolsa: carritoFiltrado.length,
        mensajeAlerta: esCarritoVacio ? 'Tu carrito está vacío' : 'Producto eliminado'
    };
}

module.exports = { agregarAlCarrito, actualizarCantidad, eliminarProducto };