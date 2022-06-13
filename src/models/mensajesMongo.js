import mongoose from "mongoose";

const mensajesCollection = 'mensajes';

const mensajesSchema = new mongoose.Schema({
    id: {type: String, required: true, max: 100},
    name: {type: String, required: true, max: 100},
    age: {type: Number, required: true},
    alias: {type: String, required: true, max: 100},
    avatar: {type: String, required: true, max: 250},
    text: {type: String, required: true, max: 500},
});

export const mensajes = mongoose.model(mensajesCollection, mensajesSchema);