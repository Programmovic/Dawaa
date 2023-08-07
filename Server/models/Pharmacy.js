const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
  pharmacy_username: { type: String, unique: true },
  pharmacy_name: String,
  pharmacy_password_hash: String,
  pharmacy_address: String,
  pharmacy_city: String,
  pharmacy_state: String,
  pharmacy_zip_code: String,
  pharmacy_country: String,
  pharmacy_phone_number: String,
  pharmacy_latitude: String,
  pharmacy_longitude: String,
  registration_date: { type: Date, default: Date.now }
});
const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);

module.exports = Pharmacy;