import mongoose from "mongoose";
import Cart from '../models/Cart.js'
import { v4 as uuidv4} from 'uuid';

const updateCart = (cartID, username, newCart) => {
    let updatedCartFinal = null;
    Cart.findById(cartID)
    .then((cart) => {
        if (cart) {
            cart.items = JSON.stringify(newCart);
            return cart.save();
        } 
        else {
            console.log('Cart not found');
            return null;
        }
    })
    .then((updatedCart) => {
        if (updatedCart) {
            updatedCartFinal = updatedCart;
            console.log('Cart updated:', updatedCart);
        }
    })
    .catch((err) => {
        console.error('Error updating cart:', err);
    });

    return updatedCartFinal;
}

const createCart = (userName) => {
    let cart = [];
    const itemsList = JSON.stringify(cart);

    let newCart = new Cart({
        username: userName,
        items: itemsList,
    })

    newCart.save()
    .then((cart) => {
        console.log("Created cart is: ", cart);
        return JSON.parse(cart.items);
    })
    .catch((err) => {
        console.error("Unable to create cart.");
    })
}

const deleteCart = (userName) => {
    Cart.deleteOne({username:userName})
    .then((result) => {
        if (result.deletedCount > 0) {
            console.log('Item deleted successfully');
            return true;
        } else {
            console.log('Item not found');
            return false;
        }
    })
    .catch((err) => {
        console.error('Error deleting item:', err);
    });
}

const retrieveCart = (userName) => {
    Cart.findOne({username:userName})
    .then((cart) => {
        if (cart) {
            console.log('Item found!');
            return JSON.parse(cart.items);
        } else {
            console.log('Item not found');
            return null;
        }
    })
    .catch((err) => {
        console.error('Error deleting item:', err);
        return null;
    });
}


export default {createCart, deleteCart, retrieveCart, updateCart};