import mongoose from "mongoose";
import Purchases from '../models/Purchases.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { v4 as uuidv4} from 'uuid';

export async function userPurchaseTransaction(username, userCartList) {
    const session = await mongoose.startSession();
    let errorMessage, status, successMessage, statusCode;
    let total = 0.0; // total price of cart.  
    let userPurchaseList = [];
    console.log("Error 11");
    try{
        await session.startTransaction();
        console.log("Error 9");
        
        const id = uuidv4();

        for(let item of userCartList){
            
            // find the specified product from cart, in the store.
            const productItem = await Product.findOne({productID: item.productID});

            // If item with given itemId not found.
            if(productItem) {
                status = false;
                statusCode = 1;
                successMessage = "";
                errorMessage = "Invalid product added to cart. The product does not exist. Please reload.";
                console.log("Error 1");
                await session.abortTransaction();
            }

            // check if prouduct details match
            if(productItem.productName !== item.productName) {
                status = false;
                statusCode = 2;
                successMessage = "";
                errorMessage = "Invalid product details. The product details do not match with stock details. Please reload.";
                console.log("Error 2");
                await session.abortTransaction();
            } else if(productItem.productPrice !== item.productPrice) {
                status = false;
                statusCode = 2;
                successMessage = "";
                errorMessage = "Invalid product details. The product details do not match with stock details. Please reload.";
                console.log("Error 3");
                await session.abortTransaction();
            }

            // check if there is enough stock for the order to be processed.
            if(productItem.productQty < item.cartQty) {
                status = false;
                statusCode = 3;
                successMessage = "";
                errorMessage = "Not enough stock. Please update the cart.";
                console.log("Error 4");
                await session.abortTransaction();
            } else {
                productItem.productQty -= item.cartQty;
                total += item.cartQty * productItem.productPrice; 
                await productItem.save();
                const purchase_item = {
                    productID: productItem.productID,
                    productTotalPrice: (item.cartQty * productItem.productPrice),                    
                    productName: productItem.productName,
                    userPurchaseQty: item.cartQty 
                }

                userPurchaseList.push(purchase_item);
            }
        }

        const newpurchase = new Purchases({
            purchaseID: id,
            purchaseName: username,
            purchaseTotal: total,
            purchaseItems: userPurchaseList,
        });

        
        console.log("Error 5");
        await newpurchase.save();
        console.log("Error 6");

        const cart = await Cart.findOne({username: username});
        console.log("Error 7");
        
        cart.items = [];

        await cart.save();

        status = true;
        statusCode = 0;
        errorMessage = "";        
        successMessage = "Purchase successfull."
        await session.commitTransaction();
    } catch(error) {
        console.log("update Transaction throwed an error: \n", error);
        await session.abortTransaction();
        successMessage = "";
        if(!errorMessage) {
            errorMessage = "Something went wrong. Purchase transaction failed.";
        }
    } finally {
        await session.endSession();
        return {success: status, error: errorMessage, successMessage: successMessage, statusCode: statusCode};
    }
};