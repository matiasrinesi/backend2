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


path.save('camiseta Barcelona', '10000', 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.futbolmania.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2F1%2Fimage%2F0f330055bc18e2dda592b4a7c3a0ea22%2FD%2FM%2FDM1840-452_camiseta-color-z-purpura-oscuro-y-rojo-nike-barcelona-2022-2023-dri-fit-stadium_1_completa-frontal.jpg&imgrefurl=https%3A%2F%2Fwww.futbolmania.com%2Fes%2Fdm1840-452&tbnid=RDC-1Mc0gpi-SM&vet=12ahUKEwiP8N_V-Z_7AhXbupUCHVIYCUoQMygGegUIARCZAg..i&docid=eokSNkiR42fCSM&w=1500&h=1500&q=camiseta%20barca&ved=2ahUKEwiP8N_V-Z_7AhXbupUCHVIYCUoQMygGegUIARCZAg');


path.save('camiseta Arsenal', '10000', 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fnewsport.vteximg.com.br%2Farquivos%2Fids%2F1098965-1000-1000%2FFH7816-A.jpg%3Fv%3D637466172821030000&imgrefurl=https%3A%2F%2Fwww.templodelfutbol.com.ar%2Fcamiseta-nino-adidas-arsenal-home-fh7816%2Fp&tbnid=WJpXKjdkOpEDRM&vet=12ahUKEwiEq6za-p_7AhU-uZUCHRsNDzEQMygBegUIARCoAg..i&docid=vd9UCb-b2SCObM&w=1000&h=1000&q=camiseta%20arsenal&ved=2ahUKEwiEq6za-p_7AhU-uZUCHRsNDzEQMygBegUIARCoAg');
