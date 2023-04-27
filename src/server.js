import express from "express";
import productManager from './ProductManager.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
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
    if(userSearch) {
        return res.status(200).json(userSearch);
    } else {
        return res.status(409).json({
            error: "Objeto no encontrado con el id " + idRequested
        });
    }
});

app.post("/api/products", async (req, res) => {
    const productToAdd = req.body;
    const products = await productManager.addProduct(productToAdd)
    res.status(200).json(products);
});


// app.put("/products/:id", (req, res) => {});

// app.delete("/products/:id", (req, res) => {});



app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
});