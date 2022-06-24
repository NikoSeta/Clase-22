const mongoose = require ("mongoose");

const productosCollection = 'productos';

const productosSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    img: {type: String, required: true},
});

let productoModel = mongoose.model(productosCollection, productosSchema);

module.exports = productoModel;