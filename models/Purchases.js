import mongoose from 'mongoose';

const purchasesSchema = new mongoose.Schema({
  purchaseID: {type: String, unique: true},
  purchaseName: {type: String, required: true},
  purchaseTotal: {type: Number, required: true},
  purchaseItems: {type: mongoose.Schema.Types.Mixed, required: true},
  purchaseDateTime: {type: Date, default: Date.now()}
});

const Purchases = mongoose.model('Purchases', purchasesSchema, 'Purchases');

export default Purchases;