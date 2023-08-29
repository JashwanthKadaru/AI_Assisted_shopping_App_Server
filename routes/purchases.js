import express from 'express'
import {insertPurchase, retrievePurchasesList} from '../utilities/Purchases.js';

const router = express.Router();

router.get("/get", async (req, res) => {
    const username = req.body.username;
    
    try {
        const purchases = await retrievePurchasesList( username );

        if(purchases && purchases.length===0){
            console.log(`No purchases made by user with username: ${username}`);
            res.json({success: true, username: username, purchaseList: purchases});
        } else if(purchases && purchases.length!==0) {
            console.log(`Purchases List of length ${purchases.length} returned. username : ${username}`);
            res.json({success: true, username: username, purchaseList: purchases});
        } else {
            console.log(`Purchases List was not returned. Error occured. Returning empty list.`);
            res.json({success: false, username: username, purchaseList: []});
        }
    } catch(error) {
        res.status(500).send(`An Internal Server Error occurred. We are sorry!`);
    }
})

router.post("/push", async (req, res) => {
    const username = req.body.username;
    const itemsList = req.body.itemsList;
    
    try {
        const purchase = await insertPurchase( username, itemsList );

        if(purchase) {
            console.log(`Purchase successful!\npurchase: ${purchase}`);
            res.json({success: true, purchase: purchase});
        } else {
            res.json({success: false, purchase: purchase});
        }
    } catch(error) {
        res.status(500).send(`An Internal Server Error occurred. We are sorry!`);
    }
})

export default router;