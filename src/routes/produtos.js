const express = require('express');
const routerProd = express.Router();
const productoModel = require ('../models/productosMongo')  
const ContenedorMongoDB = require ('../contenedor/contenedorMongoDB');
const contenedorMongoDB = new ContenedorMongoDB(productoModel)

routerProd.get('/', async (req, res) => {
    let products = await contenedorMongoDB.getAll();
    res.render('index',{ products:products });
});

module.exports = routerProd;