const ContenedorMongoDB = require ('../contenedor/contenedorMongoDB');
const contenedor = new ContenedorMongoDB;
const { modelProd } = require('../models/productosMongo');

 async function verProductos(req, res) {
    let products = await contenedor.getAll(modelProd);
    res.render('productos',{
        products: products
    });
};

module.exports = {
    verProductos
}