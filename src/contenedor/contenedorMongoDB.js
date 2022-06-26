const mongoose = require('mongoose');
const { mongoUri } = require ('../config/globals');
const { generarProductos } = require('../utils/generadorProductos');


mongoose.connect(`${mongoUri}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    },()=>console.log('Base de datos MongoDB conectada')
);

class ContenedorMongoDB {
    constructor(model) {
        this.model = model;
    }
    
    async getAll(){
        let content = [];
        let products = await this.model.find();
        return products;
    }

    async createProd(){
        const productos = { generarProductos };
        const productoSaveModel = new model.productos(productos);
        let productsSave = await productoSaveModel.save();
        console.log(productsSave);
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

    async upgrade(content) {
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