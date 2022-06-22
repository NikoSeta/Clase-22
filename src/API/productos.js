const ContenedorMemoria = require('../contendores/ContenedorMemoria')
const { generarProductos } = require('../utils/generadorDeProductos')

class ProductosMock extends ContenedorMemoria {
    constructor() {
        super('src/data/productos.json');
    }
    popular(cant = 5) {
        const nuevosProductos = [];

        for (let index = 0; index < cant; index++) {
            const nuevosProductos = generarProductos();
            nuevosProductos.push(nuevoProducto);
        }
        this.guardar(nuevosProductos);
        return nuevosProductos;
    }
}
module.exports = ProductosMock;