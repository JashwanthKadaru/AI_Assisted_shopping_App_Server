import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';
import fs from 'fs';
import {v4 as uuidv4} from 'uuid';
import mongoose from 'mongoose';
import User from './models/User.js';
import Cart from './models/Cart.js';
import Product from './models/Product.js';
import Purchases from './models/Purchases.js';

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


app.use(bodyParser.json());
app.use(express.static('public'))
app.use('', usersRoutes)


app.listen(PORT, () => {
    if(isReady) {
        console.log(`Connected to Mongodb.`)
    }
    console.log(`server running on http://localhost:${PORT}`)
})
