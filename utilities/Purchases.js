import mongoose from "mongoose";
import Purchases from '../models/Purchases.js'
import { v4 as uuidv4} from 'uuid';

const insertPurchase = ( username, total, itemsList) => {
    const purchaseId = uuidv4();
    let itemsString = JSON.stringify(itemsList);
    const newPurchase = new Purchases({
        purchaseID: purchaseId,
        purchaseName: username,
        purchaseTotal: total,
        purchaseItems: itemsString
    });

    newPurchase.save()
    .then((purchase) => {
        console.log('Purchase created:', purchase);
        return true;
    })
    .catch((err) => {
        console.error('Error creating purchase:', err);
        return false;
    });
} 

const retrievePurchasesList = (username) => {
    Purchases.find({purchaseName: username})
    .then(purchasesList => {
        if(purchasesList) {
            return purchasesList;
        } else {
            return [];
        }
    })
    .catch((error) => {
        console.error("Unable to retrieve purchases List.");
        return [];
    })
}

export default {insertPurchase, retrievePurchasesList};