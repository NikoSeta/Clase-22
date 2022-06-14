const express = require('express');
const { Router } = express;
const router = Router();
const app = express();
const { PORT } = require ('./src/config/globals')


const server = app.listen(PORT, () => {
    console.log(`Ir a la página http://localhost:${PORT}/api/productos-test`);
});