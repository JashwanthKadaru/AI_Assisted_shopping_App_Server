import mongoose from "mongoose";
import Product from '../models/Product.js'
import { v4 as uuidv4} from 'uuid';

const updateProduct = (productID, Qty) => {
    let updatedProductFinal=null;
    Product.findById(productID)
    .then((product) => {
        if (product) {
            product.productQty = product.productQty - Qty;
            product.save();
        } 
        else {
            console.log('Product not found');
            return null;
        }
    })
    .then((updatedProduct) => {
        if (updatedProduct) {
            updatedProductFinal = updatedProduct;
            console.log('Product updated:', updatedProduct);
        }
    })
    .catch((err) => {
        console.error('Error updating product:', err);
    });

    return updatedProductFinal;
}

const createProduct = (productName1, productPrice1, productQty1, productDescription1, productShortDescription1) => {
    let productID1 = uuidv4();
    let newProduct = new Product({
        productID: productID1,
        productName: productName1,
        productShortDescription: productShortDescription1,
        productDescription: productDescription1,
        productPrice: productPrice1,
        productQty: productQty1
    })

    newProduct.save()
    .then((product) => {
        console.log("Created product is: ", product);
        return product.toJSON();
    })
    .catch((err) => {
        console.error("Unable to create product.");
    })
}

const retrieveProductList = () => {
    Product.find()
    .then(productList => {
        if(productList) {
            return productList;
        } else {
            return [];
        }
    })
    .catch((error) => {
        console.error("Unable to retrieve product List.");
    })
}

export default {createProduct, retrieveProductList, updateProduct, };