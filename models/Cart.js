import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  username: String,
  items: String,
});

const Cart = mongoose.model('Cart', cartSchema, 'Cart');

export default Cart;