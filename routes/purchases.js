import express from 'express'

const router = express.Router();

router.get("/smartfashionstore/purchases",(req, res) => {
    const productList = [];
    res.send(`Message from server: The list products ${productList}`);
})

router.post("/smartfashionstore/purchases",(req, res) => {
    const product = req.body;
    res.send(`Message from server: The new product is ${product}`);
})

export default router;