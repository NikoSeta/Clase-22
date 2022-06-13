import mongoose from "mongoose";

const productosCollection = 'productos';

const productosSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    img: {type: String, required: true},
});

export const productos = mongoose.model(productosCollection, productosSchema);