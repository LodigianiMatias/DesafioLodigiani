import fs from 'fs';

export class ProductManager {
    static #id = 0;
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async loadData() {
        if (!fs.existsSync(this.path)) {
            fs.promises.writeFile(this.path, JSON.stringify(this.products));
        } else {
            this.products = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            ProductManager.#id = this.products[this.products.length - 1]?.id || 0;
        }
    }

    async addProduct(product) {
        await this.loadData();
        const verify = this.products.find((cod) => cod.code == product.code);
        if (verify != undefined) {
            return ("El código del producto ya existe");
        }
        if (!product.title ||
            !product.desc ||
            !product.price ||
            !product.thumbnail ||
            !product.code ||
            !product.stock) {
            return ("Debe completar todos los campos obligatoriamente")
        }
        this.products.push({ id: ProductManager.#id + 1, ...product })
        ProductManager.#id++
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
    }

    async getProducts() {
        await this.loadData();
        return this.products.length > 0 ? this.products : "No hay productos cargados en la base de datos";
    };

    async getProductsById(id) {
        await this.loadData();
        const findIndex = this.products.find((p) => p.id == id);
        if (findIndex) {
            return findIndex;
        } else {
            return "Id de producto no encontrado"
        }
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
            return ("id de Producto no encontrado");
        }
        if (verify !== undefined) {
            return ("El codigo del producto ya existe");
        }
        this.products.splice(searchProduct, 1, productsObject)
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
        return "Datos actualizados"
    }

    async deleteProduct(id) {
        await this.loadData();
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex == -1) {
            return ("id de Producto no encontrado");
        }
        this.products.splice(productIndex, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
    }
}

export default new ProductManager("./src/db.json");
