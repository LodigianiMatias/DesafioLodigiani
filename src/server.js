import express from "express";
import productManager from './ProductManager.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 4000;

app.get('/api/products', async (req, res) => {
    const products = await productManager.getProducts();
    const limit = parseInt(req.query.limit);
    if (!limit) {
        return res.json(products)
    } else {
        if (limit > products.length) {
            return res.status(409).json({
                error: "Ingresó un limite mayor a la cantidad de objetos en DB",
            });
        } else {
            return res.status(200).json(products.slice(0, limit));
        }
    }
});

app.get('/api/products/:pid', async (req, res) => {
    const idRequested = parseInt(req.params.pid);
    const userSearch = await productManager.getProductsById(idRequested);
    if (userSearch) {
        return res.status(200).json(userSearch);
    } else {
        return res.status(409).json({error: userSearch});
    }
});

app.post("/api/products", async (req, res) => {
    const productToAdd = req.body;
    const products = await productManager.addProduct(productToAdd)
    if (!products) {
        res.status(200).json({ message: "Producto agregado con éxito"});
    } else {
        res.status(409).json({ error: products})
    }
});


app.put("/api/products/:pid", async (req, res) => {
    const idProduct = parseInt(req.params.pid);
    const newProduct = req.body;
    const productModify = await productManager.updateProduct(idProduct, newProduct);
    if(!productModify) {
        res.status(200).json({ message: "Producto modificado con éxito"})
    } else {
        res.status(409).json({error: productModify});
    }
});

app.delete("/api/products/:pid", async (req, res) => {
    const idToDelete = parseInt(req.params.pid);
    const productEliminated = await productManager.deleteProduct(idToDelete);
    if (!productEliminated) {
        res.status(200).json({ message: "Producto eliminado con éxito"});
    } else {
        res.status(409).json({ error: productEliminated})
    }
});



app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
});