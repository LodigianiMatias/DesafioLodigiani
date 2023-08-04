import config from '../configuration/config.js'

export let ProductManager
export let CartManager

switch (config.persistence) {
  case 'MONGO':
    const { default: ProductsMongo } = await import('./mongo/productManager.mongo.js')
    ProductManager = ProductsMongo

    const { default: CartsMongo } = await import('./mongo/cartManager.mongo.js')
    CartManager = CartsMongo
    break

  case 'MEMORY':
    const { default: ProductsFS } = await import('./fs/productManager.fs.js')
    ProductManager = ProductsFS

    const { default: CartsFS } = await import('./fs/cartManager.fs.js')
    CartManager = CartsFS
    break
}
