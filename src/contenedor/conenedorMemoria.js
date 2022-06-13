import fs from ('fs');

//<---- MODIFICAR PARA MONGODB ----->
class ContenedorMemoria {
    constructor(fileName) {
        this.fileName = fileName;
    }

    getAll() {
        let content = [];

        try {
            let file = fs.readFileSync(this.fileName, 'utf-8');
            content = JSON.parse(file);
        } catch (error) {
            this.guardarEnArchivo(content);
            console.log(`Creacion del archivo ${this.fileName}`);
        }

        return content;
    }

    getById(id) {
        let contentArray = this.listarTodos();
        let content = null;

        if(contentArray.length > 0) {
            let element = contentArray.find(elem => elem.id == id);
            if(element) {
                content = element;
            }
        }

        return content;
    }

    save(content) {
        let contentArray = this.listarTodos();
        try {
            contentArray.push(content);
        } catch (error) {
            console.log(error);
        }
        
        this.saveInFyle(content);
        return content;
    }

    saveInFyle(content) {
        fs.writeFileSync(this.fileName, JSON.stringify(content));
    }

    upgrade(content) {
        let contentArray = this.listarTodos();

        let index = contentArray.findIndex(elem => {
            return elem.id === content.id;
        });

        if (index != -1) {
            contentArray[index] = content;
            this.guardarEnArchivo(contentArray);
        }

        return content;
    }

    delete(id) {
        let contentArray = this.listarTodos();

        if(productos.length > 0) {
            let newProductsArray = contentArray.filter(elem => elem.id != id);
            this.guardarEnArchivo(newProductsArray);
        }
    }

}

module.exports = ContenedorMemoria;