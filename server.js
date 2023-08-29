import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/users.js';
import cartRoutes from './routes/cart.js';
import productRoutes from './routes/products.js';
import purchaseRoutes from './routes/purchases.js';

import fs from 'fs';
import {v4 as uuidv4} from 'uuid';
import mongoose from 'mongoose';
import User from './models/User.js';
import Cart from './models/Cart.js';
import Product from './models/Product.js';
import Purchases from './models/Purchases.js';
import cors from 'cors';
const app = express();
const PORT = 5123;
let isReady = false;

mongoose.connect('mongodb://0.0.0.0:27017/smartstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    isReady=true;
  })
  .catch((err) => {
    isReady=false;
    console.error('Error connecting to MongoDB:', err);
});

app.use(cors({
  origin: 'http://localhost:3000' // Change this to your client's URL
}));

app.use(bodyParser.json());
app.use(express.static('public'))
app.use('/smartfashionstore/', userRoutes);
app.use('/smartfashionstore/cart', cartRoutes);
app.use('/smartfashionstore/products', productRoutes);
app.use('/smartfashionstore/purchases', purchaseRoutes);


app.listen(PORT, () => {
    if(isReady) {
        console.log(`Connected to Mongodb.`)
    }
    console.log(`server running on http://localhost:${PORT}`)
})
