const express = require('express');
const routerProd = express.Router();
const ContenedorMongoDB = require ('../contenedor/contenedorMongoDB');
const contenedorMongoDB = new ContenedorMongoDB

routerProd.get('/', async (req, res) => {
    let products = await contenedorMongoDB.getAll();
    res.render('index',{  });
});

module.exports = routerProd;