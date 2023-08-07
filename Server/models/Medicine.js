const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  medicine_name: String,
  medicine_description: String,
  medicine_brand: String,
  medicine_category: String,
  medicine_price: Number,
  pharmacy_id: mongoose.Schema.Types.ObjectId
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;