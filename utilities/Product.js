import mongoose from "mongoose";
import Product from '../models/Product.js'
import { v4 as uuidv4} from 'uuid';

export async function updateProduct(productList) {
    try {
        const updatePromises = productList.map(async (item) => {
            const productID = item.id;
            const newQty = item.newQty;

            const product = await Product.findById(productID);

            if (product) {
                product.productQty = newQty;
                const updatedProduct = await product.save();
                if (updatedProduct) {
                    console.log(`Product with ID ${productID} updated.`);
                } else {
                    console.log(`Failed to update product with ID ${productID}.`);
                }
            } else {
                console.log(`Product with ID ${productID} not found.`);
            }
        });

        await Promise.all(updatePromises);

        return { success: true };
    } catch (error) {
        console.error('Error updating products:', error);
        throw error;
    }
}

export async function createProduct(productName1, productPrice1, productQty1, productDescription1, productShortDescription1, productType1, productPicture1) {
    try{
        let productID1 = uuidv4();
        let newProduct = new Product({
            productID: productID1,
            productName: productName1,
            productShortDescription: productShortDescription1,
            productDescription: productDescription1,
            productPrice: productPrice1,
            productQty: productQty1,
            productType: productType1,
            productPicture: productPicture1,
        });

        const product = await newProduct.save();
        
        if(product){
            console.log("Created product is: ", product);
            return product.toJSON();
        } else {
            console.log("Failed to create product.");
            return null;
        }
    }catch(error) {
        console.error("Unable to create product. Error thrown: ", error);
        throw error;
    }
}

export async function retrieveProductList() {
    try{
        const productList = await Product.find();
        if(productList)
        {            
            if(productList.length===0) {
                return [];
            } else {
                return productList;
            }
        } else {
            return [];
        }
    } catch(error){
        console.log("Unable to retrieve product List.");
        throw error;
    }
}

export async function retrieveProductById(prodID) {
    try{
        const result = await Product.findOne({productID:prodID});
        if(result){
            console.log(`Found product with porduct id: ${prodID}`);
            return result;
        } else {
            console.log(`Couldn't find product with product id: ${prodID}`);
            return null;
        }
    }catch(error) {
            console.error("Unable to retrieve product List.");
            throw error;
    }    
}

export async function deleteProductById(prodID) {
    try{
        const result = await Product.deleteOne({productID:prodID});
        if(!result.acknowledged) {
            console.log(`The reuqest for delete product with product id: ${prodID} was not acknowledged by the DB.`);
            return {success: false, ...result};
        }
        else if(result.deletedCount>0){
            console.log(`Found and deleted product with product id: ${prodID}`);
            return {success:true, ...result};
        } else {
            console.log(`Couldn't find product with product id: ${prodID}`);
            return {sucess:false, ...result};
        } 
    }catch(error) {
            console.error("Unable to retrieve product List.");
            throw error;
    }    
}