import mongoose from 'mongoose';

const purchasesSchema = new mongoose.Schema({
  purchaseID: {type: String, unique: true},
  purchaseName: String,
  purchaseTotal: Number,
  purchaseItems: String,
  purchaseDateTime: {type: Date, default: Date.now()}
});

const Purchases = mongoose.model('Purchases', purchasesSchema, 'Purchases');

export default Purchases;