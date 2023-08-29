import mongoose from "mongoose";
import Purchases from '../models/Purchases.js'
import {retrieveProductById} from '../utilities/Product.js'
import { v4 as uuidv4} from 'uuid';

export async function insertPurchase( username, itemsList ) {
    try{
        let total = 0;
        let itemsList1 = [];
           
        try{
            for (const item of itemsList) {
                const product = await retrieveProductById(item.productId);
                const price = product.productPrice;

                total += item.productQty * price;
                itemsList1.push({
                    productName: product.productName,
                    productQty: item.productQty,
                    totalCost: item.productQty * price,
                });
            }
        } catch(error) {
            throw error;
        }

        const purchaseId = uuidv4();
        let itemsString = JSON.stringify(itemsList1);
        const newPurchase = new Purchases({
            purchaseID: purchaseId,
            purchaseName: username,
            purchaseTotal: total,
            purchaseItems: itemsString
        });

        const purchase = await newPurchase.save();

        if(purchase){
            console.log('Purchase created:', purchase);
            return purchase;
        } else {
            console.log('Failed to create purchase:');
            return null;
        }
    } catch(error) {
        console.error('Error creating purchase:', err);
        throw error;
    };
} 

export async function retrievePurchasesList(username) {
    try {
        const purchasesList = await Purchases.find({purchaseName: username})
        if(purchasesList){
            if(purchasesList.length===0) {
                return [];
            } else {
                return purchasesList;
            }
        } else {
            return [];
        }
    } catch(error){
        console.error("Unable to retrieve purchases List.");
        throw error;
    }
}

export default {insertPurchase, retrievePurchasesList};