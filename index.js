const fs = require("fs");

class contenedor {
    constructor(path) {
        this.path = path
    }

    getAll = async () => {
        try {
            let info = await fs.promises.readFile(this.path, 'utf-8')
            let productos = JSON.parse(info)
            return productos

        } catch (error) {
            console.log(error)
        }

    }


    save = async (title, price, thumbnail) => {
        let producto = {
            title: title,
            price: price,
            thumbnail: thumbnail,
        }
        let stock = await this.getAll();

        try {
            if (stock.length === 0) {
                producto.id = 0;
                stock.push(producto)
                await fs.promises.writeFile(this.path, JSON.stringify(stock, null, 2))
            } else {
                producto.id = stock[stock.length - 1].id + 1
                stock.push(producto)
                await fs.promises.writeFile(this.path, JSON.stringify(stock, null, 2))
            }
        } catch (error) {
            console.log(error)
        }
    }

    getById = async (numero) => {
        let cantidad = await this.getAll()
        try {
            let elegir = cantidad.find(o => o.id == numero)
            return elegir
        } catch (error) {
            console.log(error)
        }
    }

    deleteById = async (numero) => {
        let cantidad = await this.getAll()
        try {
            let eliminar = cantidad.filter(o => o.id != numero)
            await fs.promises.writeFile(this.path, JSON.stringify(eliminar, null, 2))
        } catch (error) {
            console.log(error)
        }
    }

    deleteAll = async () => {
        try {
            await fs.promises.writeFile(this.path, ('[]'))
        } catch (error) {
            console.log(error)
        }
    }
}


let path = new contenedor('productos.json')


path.save('camiseta Barcelona', '10000', 'https://d3ugyf2ht6aenh.cloudfront.net/stores/026/234/products/mar3-f5eadb0e0e488ae7cd15467468945501-50-0.png');


path.save('camiseta Arsenal', '10000', 'https://d3ugyf2ht6aenh.cloudfront.net/stores/026/234/products/mar3-f5eadb0e0e488ae7cd15467468945501-50-0.png');
//path.getById(0).then(res => console.log(res))

//path.deleteById(1)
//path.deleteAll()