const express = require('express');
const app = express();
const { PORT } = require ('./src/config/globals');
const routerProd = require('./src/routes/produtos');

app.use('/', routerProd);
app.use('/api/productos-test', routerProd);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public"));

const server = app.listen(PORT, () => {
    console.log(`Ir a la página http://localhost:${PORT}`);
});