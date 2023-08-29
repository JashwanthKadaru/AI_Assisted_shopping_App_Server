import mongoose from "mongoose";
import Cart from '../models/Cart.js'
import { v4 as uuidv4} from 'uuid';

export async function updateCart(username, newCart) {
    let updatedCartFinal = null;
    
    try {
        const cart = await Cart.findOne({username: username});
        
        if(cart) {
            console.log('cart: ', cart);
            const updatedNewCart = await Cart.findOneAndUpdate({username:username}, {items: JSON.stringify(newCart)}, {new: true});
            
            if(updatedNewCart) {
                if(updatedNewCart.items===cart.items) {
                    console.log(`Nothing was updated. New cart: ${JSON.parse(updatedNewCart.items)}\nOld cart: ${JSON.parse(cart.items)}`);
                    return {success: false, newCart: JSON.parse(updatedNewCart.items)};
                }
                else {
                    console.log(`Update successfully. Changes happened. New cart: ${JSON.parse(updatedNewCart.items)}`);
                    return {success: true,  newCart: JSON.parse(updatedNewCart.items)};
                }
            } else {
                console.log(`Couldn't find the document. username: ${username}`);
                return {success: false,  newCart: null};
            }
        } else {
            console.log(`could not find any cart for username: ${username}`);
            return {success: false, newCart: null};
        }
    } catch(error) {
        console.error("An error occurred during update: ",error);
        throw error;
    }
}

export async function createCart(userName) {
    let cart = [];
    
    try{
        const itemsList = JSON.stringify(cart);

        let newCart = new Cart({
            username: userName,
            items: itemsList,
        });

        const userCart = await newCart.save();
        
        if(userCart) {
            console.log("Created cart is: ", userCart);
            return userCart;
        } else {
            console.log("Unable to create user cart");
            return null;
        }

    }catch(error) {
        console.error("Unable to create cart. error thrown: \n", error);
        if(error.code===11000)
            return null;
        else throw error;
    }

}


export async function deleteCart(userName) {
    try{
        const result = await Cart.deleteOne({username:userName})
        if(result) {
            if (result.deletedCount > 0) {
                console.log('Item deleted successfully');
                return {success:true, ...result};
            } else {
                console.log('Item not found.');
                return {success:false, ...result};
            }
        }
    }catch(error) {
        console.error('Error deleting item:', error);
        throw error;
    };
}

export async function retrieveCart(userName) {
    
    try{
        const cart = await Cart.findOne({username:userName});
    
        if (cart) {
            console.log('Item found!');
            // return JSON.parse(cart.items || '[]');
            return cart.items;
        } else {
            console.log('Item not found');
            return null;
        }
    }catch(error){
        console.error('Error deleting item:', error);
        throw error;
    }
}


export default {createCart, deleteCart, retrieveCart, updateCart};