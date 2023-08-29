import express from 'express'
import {createCart, retrieveCart, updateCart, deleteCart} from '../utilities/Cart.js'

const router = express.Router();

router.get("/user", async (req, res) => {
    const username = req.body.username;

    try{
        const cartList = await retrieveCart(username);

        if(cartList) {
            console.log(`cart is: ${cartList}`);
            res.json({success: true, cart: cartList});
        } else {
            console.log(`cart not found. Meaning cart is empty. cart : ${cartList}`)
            res.json({success: true, cart: []});
        }
    } catch(error) {
        res.status(500).json();
    }
    
})

router.post("/user", async (req, res) => {
    const username = req.body.username;

    try {
        const cart = await createCart(username);

        if(cart) {
            console.log('cart created successfully.');
            res.json({success: true, cart: cart});
        } else {
            console.log('Failed to create cart.');
            res.json({success: false, cart: cart});
        }
    } catch(error) {
        res.status(500).send("An internal error occured. We are sorry!")
    }
})

router.patch("/user", async (req, res) => {
    const cart = req.body.cart;
    const username = req.body.username;

    try {
        const result = await updateCart(username, cart);

        if(result.success) {
            console.log('cart updated successfully.');
            res.json(result);
        } else if(result.newCart){
            console.log('Failed to update cart.');
            res.json(result);
        } else {
            console.log('Failed to find cart for username', username);
            res.json(result);
        }
    } catch(error) {
        res.status(500).send("An internal error occured. We are sorry!")
    }
})

router.delete("/user", async (req, res) => {
    const username = req.body.username;

    try {
        const result = await deleteCart(username);
        if(result.success) {
            // code sepcific for success scenario, can be added here if needed later.
            console.log('cart deleted successfully. username: ', username);
            res.json(result);
        } else {
             // code sepcific for failure scenario, can be added here if needed later.
            console.log('Failed to delete cart. username: ', username);
            res.json(result);
        }
    } catch(error) {
        console.error('An error occured while deleting cart. username: ', username);
        res.status(500).send("An internal error occured. We are sorry!");
    }

})

export default router;