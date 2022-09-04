require('dotenv').config();
const express = require('express');
const cors = require("cors");

require("./db/config");

const Product = require("./db/Product");
const Order = require("./db/order");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/products", async (req, resp) => {
    const products = await Product.find();
    if (products.length > 0) {
        resp.send(products)
    } else {
        resp.send({ result: "No Product found" })
    }
});

app.post('/confirm-order', async (req, res) => {
    const data = new Order({
        emailId: req.body.emailId,
        amount: req.body.amount
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.listen(process.env.PORT, () => {
 console.log(`Server listening on ${process.env.PORT}`);
});