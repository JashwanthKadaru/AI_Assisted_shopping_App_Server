import mongoose from "mongoose";
import Cart from '../models/Cart.js'
import Product from '../models/Product.js'
import { v4 as uuidv4} from 'uuid';

// export async function updateCart(username, newCart) {
//     let updatedCartFinal = null;
    
//     try {
//         const cart = await Cart.findOne({username: username});
        
//         if(cart) {
//             console.log('cart: ', cart);
//             const updatedNewCart = await Cart.findOneAndUpdate({username:username}, {items: JSON.stringify(newCart)}, {new: true});
            
//             if(updatedNewCart) {
//                 if(updatedNewCart.items===cart.items) {
//                     console.log(`Nothing was updated. New cart: ${JSON.parse(updatedNewCart.items)}\nOld cart: ${JSON.parse(cart.items)}`);
//                     return {success: false, newCart: JSON.parse(updatedNewCart.items)};
//                 }
//                 else {
//                     console.log(`Update successfully. Changes happened. New cart: ${JSON.parse(updatedNewCart.items)}`);
//                     return {success: true,  newCart: JSON.parse(updatedNewCart.items)};
//                 }
//             } else {
//                 console.log(`Couldn't find the document. username: ${username}`);
//                 return {success: false,  newCart: null};
//             }
//         } else {
//             console.log(`could not find any cart for username: ${username}`);
//             return {success: false, newCart: null};
//         }
//     } catch(error) {
//         console.error("An error occurred during update: ",error);
//         throw error;
//     }
// }

export async function createCart(userName) { 
    try{
        const cart = [];

        let newCart = new Cart({
            username: userName,
            items: cart,
        });

        const userCart = await newCart.save();
        
        if(userCart) {
            console.log("Created cart is: ", userCart);
            return {success:true, cart: userCart};
        } else {
            console.log("Unable to create user cart");
            console.log("Created cart is: ", userCart);
            return {success:false, cart: null};
        }

    }catch(error) {
        console.error("Unable to create cart. error thrown: \n", error);
        if(error.code===11000)
        {
            console.log("Unable to create user cart");
            console.log("Created cart is: ", userCart);
            return {success:false, cart: null};
        }
        else throw error;
    }

}


// export async function deleteCart(userName) {
//     try{
//         const result = await Cart.deleteOne({username:userName})
//         if(result) {
//             if (result.deletedCount > 0) {
//                 console.log('Item deleted successfully');
//                 return {success:true, ...result};
//             } else {
//                 console.log('Item not found.');
//                 return {success:false, ...result};
//             }
//         }
//     }catch(error) {
//         console.error('Error deleting item:', error);
//         throw error;
//     };
// }

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


export async function updateCart(username, itemID, qty, op) {
    try {
        const user_cart = await Cart.findOne({username: username});

        if(!user_cart) {
            console.log("username: ", username);
            return {success: false, error: "Cart does not exist", errorCode: 1, new_cart: null};
        }

        let cart_list = user_cart.items;

        const product_in_stock = await Product.findOne({productID: itemID});
        console.log("product_in_stock:",product_in_stock,"\nproductID:",itemID);

        if(op==='add'){
            let found = false;
            for(let cart_item of cart_list) {
                if(cart_item.productID === itemID) {
                    found=true;
                    if(cart_item.cartQty < product_in_stock.productQty)
                    { 
                        cart_item.cartQty += 1; //qty;
                    } else {
                        return {success: false, error: "Stock not available.", errorCode: 4, new_cart: cart_list};      
                    }
                } 
            }

            if(!found) {
                let  new_cart_item = {
                    productID: itemID,
                    productName: product_in_stock.productName,
                    productPrice: product_in_stock.productPrice,
                    productType: product_in_stock.productType,
                    cartQty: 1, 
                }

                cart_list.push(new_cart_item);
            }

            console.log(user_cart);
            user_cart.items = cart_list;
            let response2 = await Cart.updateOne({username: username}, {items: cart_list});

            console.log("cart_list:",cart_list);
            console.log("response2:",response2);            
            return {success: true, error: "", errorCode: 0, new_cart: cart_list};
        } else if(op==='remove') {
            let found = false;
            
            let new_cart_list = cart_list.filter((cart_item) => {
                if(cart_item.productID === itemID) {
                    found = true;
                    return false;   
                }
                return true;
            })

            if(!found){
                return {success: false, error: "No such product in cart to be removed.", errorCode: 3, new_cart: cart_list};
            }

            user_cart.items = new_cart_list;
            let response2 = await Cart.updateOne({username: username}, {items: new_cart_list});

            console.log("cart_list:",new_cart_list);
            console.log("response2:",response2);            
            return {success: true, error: "", errorCode: 0, new_cart: new_cart_list};
        } else if(op==='reduce') {
            let found = false;
    
            let new_cart_list = cart_list;
            
            for(let cart_item of new_cart_list) {
                if(cart_item.productID === itemID) {
                    cart_item.cartQty -= 1; //qty;
                    found = true;
                    break;
                }
            }

            if(!found){
                return {success: false, error: "No such product in cart to be removed.", errorCode: 3, new_cart: cart_list};
            }

            user_cart.items = new_cart_list;
            let response2 = await Cart.updateOne({username: username}, {items: new_cart_list});

            console.log("cart_list:",new_cart_list);
            console.log("response2:",response2);    

            return {success: true, error: "", errorCode: 0, new_cart: new_cart_list};    
        } else {
            return {success: false, error: "Invalid parameters", errorCode: 2, new_cart: null};
        }
        
    } catch(error) {
        console.log(error);
    }
}

export default {createCart, retrieveCart, updateCart};