import { ProductManager } from './index.js';
import express from "express";
import fs from 'fs';

const app = express();
const PORT = 4000;

let productsInDb = JSON.parse(await fs.promises.readFile('./db.json', 'utf-8'))

app.listen(PORT, () => {
console.log(`Example app listeningg on port http:localhost.${PORT}`)
});

app.get('/products', (req, res) => {
    const limit = req.query.limit;

    if(!limit) {
        return res.json(productsInDb)
    } else {
        if (limit >= productsInDb.lenght) {
            return res.send("Ingresó un limite mayor a la cantidad de objetos en DB")
        } else {
        for (let i=0; i<limit; i++) {
            return res.json(productsInDb[i])
        }}
    }
});

