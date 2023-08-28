import express from 'express'

const router = express.Router();

router.get("/smartfashionstore/products",(req, res) => {
    const productList = [];
    res.send(`Message from server: The list products ${productList}`);
})

router.post("/smartfashionstore/products",(req, res) => {
    const product = req.body;

    res.send(`Message from server: The new product is ${product}`);
})

router.patch("/smartfashionstore/products",(req, res) => {
    const productId = req.body.Id;
    const productQty = req.body.Qty;

    res.send(`Message from server: The productId ${productId} is and quantity is ${productQty}`);
})

router.delete("/smartfashionstore/products",(req, res) => {
    const productId = req.body.Id;

    res.send(`Message from server: The productId is ${productId}`);
})

export default router;