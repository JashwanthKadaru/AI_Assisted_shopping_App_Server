import mongoose from 'mongoose';

const purchasesSchema = new mongoose.Schema({
  purchaseID: String,
  purchaseName: String,
  purchaseTotal: Number,
  purchaseItems: String
});

const Purchases = mongoose.model('Purchases', purchasesSchema, 'Purchases');

export default Purchases;