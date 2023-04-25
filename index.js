import fs from 'fs';

class ProductManager {
    static #id = 0;
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async loadData() {
        if (!fs.existsSync(this.path)) {
            fs.promises.writeFile(this.path, JSON.stringify(this.products));
            console.log("DB creada")
        } else {
            this.products = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            console.log("Datos cargados")
            ProductManager.#id = this.products[this.products.length - 1]?.id || 0;
        }
    }

    async addProduct(title, desc, price, thumbnail, code, stock) {
        let productsObject = {
            id: ProductManager.#id+1,
            title: title,
            desc: desc,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
        }
        // const arrayVerify = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        let verify = this.products.find((cod) => cod.code === code)
        if (verify != undefined) {
            throw new Error("El codigo del producto ya existe")
        }
        if (!title ||
            !desc ||
            !price ||
            !thumbnail ||
            !code ||
            !stock) {
            throw new Error("Debe completar todos los campos obligatoriamente")
        }
        const arrayAux = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        arrayAux.push(productsObject)
        ProductManager.#id++
        await fs.promises.writeFile(this.path, JSON.stringify(arrayAux, null, 2))


    }

    async getProducts() {
        const productsInDB = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        return productsInDB.length > 0 ? productsInDB : "No hay productos cargados en la base de datos";
    }

    async updateProduct(id, title, desc, price, thumbnail, code, stock) {
        let productsObject = {
            id: id,
            title: title,
            desc: desc,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
        }
        const searchProduct = this.products.findIndex((p) => p.id === id)
        let verify = this.products.find((cod) => cod.code === code)
        if (searchProduct === -1) {
            throw new Errror("id de Producto no encontrado");
        }
        if (verify !== undefined) {
            throw new Error("El codigo del producto ya existe")
        }
        this.products.splice(searchProduct, 1, productsObject)
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
        return "Datos actualizados"
    }

    async deleteProduct(id) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex == -1) {
            throw new Errror("id de Producto no encontrado");
        }
        this.products.splice(productIndex, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
    }
}

test();
async function test() {
    const product = new ProductManager("db.json")
    await product.loadData();

    // METODO ADD PRODUCT

    // await product.addProduct("Nuez", "Nuez Extra Light de Mendoza", 400, "sin ruta", 100, 10);
    await product.addProduct("Miel", "Colmena de cristal", 500, "sin ruta", 101, 10);
    // await product.addProduct("Almendra", "Non Pareil chilena", 400, "sin ruta", 124352, 10);

    
    // METODO DELETE PRODUCT
    // await product.deleteProduct(3);


    // METODO UPDATE PRODUCT
    // await product.updateProduct(1, "Pochoclos", "Bolsa x100grs", 150, "sin ruta", 104, 300);

    // METODO GET PRODUCTS
    console.log(await product.getProducts())
}
