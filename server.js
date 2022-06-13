const express = require('express');
const app = express();
const { PORT } = require ('./src/config/globals')

app.use(express.json());
app.use(express.urlencoded({extended : true}));

const server = app.listen(PORT, () => {
    console.log(`Ir a la página http://localhost:${PORT}/api/productos-test`);
});