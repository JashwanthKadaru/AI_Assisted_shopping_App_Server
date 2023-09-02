import express from 'express'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {createProduct, retrieveProductList, retrieveProductById, updateProduct, deleteProductById} from '../utilities/Product.js'
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/img')); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });


// setting up router for products api
const router = express.Router();

// GET URL for fetching list of all products
router.get("/list", async (req, res) => {
    try {
        const productList = await retrieveProductList(); 
        if(productList!==null) {
            if(productList.length===0){
                console.log(`Returning empty product List`);
                res.json({success:true, productList:[]});
            } else {
                console.log(`Returning product List of length ${productList.length}`);
                res.json({success:true, productList:productList});
            }
        } else {
            console.log(`Couldn't fetch products`);
            res.json({success:false, productList:[]});
        }
    } catch(error) {
        res.status(500).send(`An Internal Server Error occurred. We are sorry!`);
    }
})

// GET URL for fetching single product, all details
router.get("/:id", async (req, res) => {
    const product = null;
    const id = req.params.id
    try {
       product = await retrieveProductById(id);    

       if(product) {
            console.log(`product returned successfully.`);
            res.json({success:true, product:product});
       } else {
            console.log(`product not found.`);
            res.json({success:false, product:null});
       }
    }catch (error) {
        res.status(500).send(`An Internal Server Error occurred. We are sorry!`);
    }
})


// POST URL for adding a product
router.post("/new",async (req, res) => {
    const product = req.body;
    const picture = req.file;

    try {
        if (!picture) {
            res.status(400).json({ success: false, errorMessage: 'No image uploaded' });
            return;
         }

        console.log('Uploaded image path:', picture.path);

        const imageFileName = picture.filename; 
        const imageDestination = path.join(__dirname, '../public/img', imageFileName); 
        console.log('Image destination filename:', imageDestination);
        fs.renameSync(picture.path, imageDestination);
        const picturePathInDB = imageFileName;

        const newProduct = await createProduct(product.productName, product.productPrice, product.productQty, product.productDescription, product.productShortDescription, product.productType, picturePathInDB);
        
        if(newProduct) {
            console.log(`new product created: ${newProduct}`);
            res.json({success:true, product:newProduct});
        } else{
            console.log(`Couldn't create the new product in db.`);
            res.json({success:false, product:newProduct});
        }
    }catch(error) {
        res.status(500).send(`An Internal Server Error occurred. We are sorry!`);   
    }
})

// PATCH URL for updating product 
// router.patch("/", async (req, res) => {
//     const productList = req.body.pList;

//     try {
//         const result = await updateProduct(productList);

//         if(result.success) {
//             console.log(`Successfully updated product.`);
//             res.json(result);
//         } else {
//             console.log(`Couldn't update product with productId : ${productId}`);
//             res.json(result);
//         }
//     } catch(error) {
//         res.status(500).send(`An Internal Server Error occurred. We are sorry!`); 
//     }
// })

// DELETE URL for deleting products
// router.delete("/rm", async (req, res) => {
//     const productId = req.body.Id;

//     try{
//         const result = await deleteProductById(productId);

//         if(result.success) {
//             console.log(`Successfully deleted product.`);
//             res.json(result);
//         } else {
//             console.log(`Couldn't delete product with productId : ${productId}`);
//             res.json(result);
//         }
//     } catch(error) {
//         res.status(500).send(`An Internal Server Error occurred. We are sorry!`); 
//     }
// })

export default router;