const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine.js");

// Get all medicines
router.get("/", async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific medicine by ID
router.get("/:id", async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all medicines for a specific pharmacy
router.get("/pharmacy/:id", async (req, res) => {
  try {
    const medicines = await Medicine.find({ pharmacy_ids: req.params.id });
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new medicine for a specific pharmacy
router.post("/pharmacy/:id", async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    medicine.pharmacy_ids = [req.params.id]; // Initialize the pharmacy_ids array with the provided ID
    await medicine.save();
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let medicinesData = req.body;

    // Ensure medicinesData is an array, even if only one item is provided
    if (!Array.isArray(medicinesData)) {
      medicinesData = [medicinesData];
    }

    // Validate each medicine data
    const medicines = medicinesData.map((medicineData) => {
      const {
        drugbank_id,
        alternate_drugbank_ids = [],
        name,
        description,
        biotech_categories = [],
        cas_number,
        unii,
        groups = [],
        drug_type,
        synthesis_references,
        synonyms = [],
        organisms = [],
        ahfs_codes = [],
        food_interactions = [],
        pharmacy_ids = [],
        box_shape,
        box_color,
        category,
      } = medicineData;

      return new Medicine({
        drugbank_id,
        alternate_drugbank_ids,
        name,
        description,
        biotech_categories,
        cas_number,
        unii,
        groups,
        drug_type,
        synthesis_references,
        synonyms,
        organisms,
        ahfs_codes,
        food_interactions,
        pharmacy_ids,
        box_shape,
        box_color,
        category,
      });
    });

    // Save all medicines to the database
    const savedMedicines = await Medicine.insertMany(medicines);

    // Respond with the newly created medicines
    res.json(savedMedicines);
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json({ error: error.message });
  }
});

// Update an existing medicine for a specific pharmacy
router.put("/pharmacy/:id/:medicineId", async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.medicineId,
      req.body,
      { new: true }
    );
    if (medicine && !medicine.pharmacy_ids.includes(req.params.id)) {
      medicine.pharmacy_ids.push(req.params.id);
      await medicine.save();
    }
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a medicine for a specific pharmacy
router.delete("/pharmacy/:id/:medicineId", async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.medicineId);
    if (medicine) {
      medicine.pharmacy_ids = medicine.pharmacy_ids.filter(
        (id) => id.toString() !== req.params.id
      );
      if (medicine.pharmacy_ids.length === 0) {
        await Medicine.findByIdAndDelete(req.params.medicineId);
      } else {
        await medicine.save();
      }
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete all medicines
router.delete("/", async (req, res) => {
  try {
    await Medicine.deleteMany({});
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
