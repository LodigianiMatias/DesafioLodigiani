import express from "express";
import productManager from './ProductManager.js';

const app = express();
const PORT = 4000;

app.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    const limit = parseInt(req.query.limit);
    if (!limit) {
        return res.json(products)
    } else {
        if (limit > products.length) {
            // res.statusCode = 400;
            return res.status(409).json({
                error: "Ingresó un limite mayor a la cantidad de objetos en DB",
            });
        } else {
            return res.json(products.slice(0, limit));
        }
    }
});

app.get('/products/:pid', async (req, res) => {
    const products = await productManager.getProducts();
    const idRequested = req.params.id;
    const userSearch = products.find((p) => p.id == idRequested);
    if(userSearch) {
        return res.json(userSearch);
    } else {
        return res.status(409).json({
            error: "Objeto no encontrado con el id " + idRequested
        })
    }
});

app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
});