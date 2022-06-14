const express = require('express');
const { Router } = express;
const router = Router();
const ContenedorMongoDB = require('../API/productos')
const contenedorMongoDB = new ContenedorMongoDB();



// Listar todos
app.get('/', async function(req, res){

 });


module.exports = app;

