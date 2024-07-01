const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    drugbank_id: String,
    alternate_drugbank_ids: [String],
    name: String,
    description: String,
    biotech_categories: [String],
    cas_number: String,
    unii: String,
    groups: [String],
    drug_type: String,
    synthesis_references: String,
    synonyms: [String],
    organisms: [String],
    ahfs_codes: [String],
    food_interactions: [String],
    pharmacy_ids: [mongoose.Schema.Types.ObjectId],
    box_shape: String,
    box_color: String,
    category: String // Added category field
  },
  { timestamps: true }
);

module.exports = mongoose.models.Medicine || mongoose.model("Medicine", medicineSchema);
