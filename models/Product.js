import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productID: {type: String, unique: true, required:true},
  productName: {type: String, unique: true, required:true},
  productType: {type: String, required:true},
  productShortDescription: {type:String, required:true},
  productDescription: {type:String, required:true},
  productPrice: {type:Number, required:true},
  productPicture: {type:String, required: true},
  productQty: {type:Number, required:true},
},{versionKey: 'version'});

const Product = mongoose.model('Product', productSchema, 'Product');

export default Product;