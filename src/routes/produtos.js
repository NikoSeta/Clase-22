const ContenedorMongoDB = require ('../contenedor/contenedorMongoDB');
const express = require('express');
const routerProd = express.Router();
const contenedorMongoDB = new ContenedorMongoDB

routerProd.get('/', async (req, res) => {
    let products = await contenedorMongoDB.getAll();
    res.render('index',{
        products: products
    });
});

module.exports = routerProd;