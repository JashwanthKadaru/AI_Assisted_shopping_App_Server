import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/users.js';
import cartRoutes from './routes/cart.js';
import productRoutes from './routes/products.js';
import purchaseRoutes from './routes/purchases.js';
import imagesRouter from './routes/images.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use('/static',express.static(path.join(__dirname, '/public/img')))

app.use('/smartfashionstore/public', imagesRouter)
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
