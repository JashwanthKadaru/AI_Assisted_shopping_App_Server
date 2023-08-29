import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  items: String,
});

const Cart = mongoose.model('Cart', cartSchema, 'Cart');

export default Cart;