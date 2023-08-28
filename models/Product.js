import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productID: String,
  productName: String,
  productShortDescription: String,
  productDescription: String,
  productPrice: Number,
  productQty: Number
});

const Product = mongoose.model('Product', productSchema, 'Product');

export default Product;