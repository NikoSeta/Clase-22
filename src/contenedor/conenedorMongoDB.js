import mongoose from ("mongoose");
import * as model from ('./src/models/usuarios.js');
import { mongoDb } from "../config/globals.js";
const {generarProductos} = require('../utils/generadorDeProductos')

const URL = mongoDb;

let respuesta = await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
console.log('Base de datos Mongo conectada');
class ContenedorMongoDB {
    constructor(URL) {
        this.URL = URL;
    }
    async createProd (){
        const productos = {
            generarProductos
        };
        const productoSaveModel = new model.productos(productos);
        let productsSave = await productoSaveModel.save();
        console.log(productsSave);
    }

    async getAll() {
        let content = [];
        let productos = await model.productos.find({});
        content = JSON.parse(productos);
    }

    async getById(id) {
        let productoArray = this.getAll();
        let content = null;

        if(productoArray.length > 0) {
            let producto = await model.productos.find(elem => elem.id == id);
            if(producto) {
                content = producto;
            }
        }
        return content;
    }

    upgrade(content) {
        let contentArray = this.getAll();
        
        let index = contentArray.findIndex(elem => {
            return elem.id === content.id;
        });

        if (index != -1) {
            let usuarioUpdate = await model.usuarios.updateOne(
                {name: content.name},
                {price: content.price},
                {img: content.img}
            );
            console.log(usuarioUpdate);
        }
        return content;
    }

    async delete(id) {
        let productosArray = this.getAll();
      
        if(productos.length > 0) {
            let usuarioDelete = await model.usuarios.deleteOne(elem => elem.id != id);
            console.log(usuarioDelete);
        }
        return productosArray
    }
}

module.exports = ContenedorMongoDB;