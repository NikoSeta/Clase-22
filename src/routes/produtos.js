const express = require('express');
const { Router } = express;
const router = Router();

const ProductosMock = require('../API/productos')
const apiProductos = new ProductosMock();

// Listar todos
router.get('/', async (req, res, next) => {
    try {
        res.json(await apiProductos.getAll());
    } catch (error) {
        next(error);
    }
});


module.exports = router;

