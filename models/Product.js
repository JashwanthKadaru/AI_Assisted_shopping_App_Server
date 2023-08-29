import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productID: {type: String, unique: true},
  productName: {type: String, unique: true},
  productType: {type: String},
  productShortDescription: String,
  productDescription: String,
  productPrice: Number,
  productQty: Number
});

const Product = mongoose.model('Product', productSchema, 'Product');

export default Product;