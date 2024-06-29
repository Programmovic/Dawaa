const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Pharmacy = require("../models/Pharmacy.js");

// Get all pharmacies
router.get("/", async (req, res) => {
  const pharmacies = await Pharmacy.find();
  res.json(pharmacies);
});

// Get a specific pharmacy by ID
router.get("/:id", async (req, res) => {
  const pharmacy = await Pharmacy.findById(req.params.id);
  res.json(pharmacy);
});

// Create a new pharmacy
router.post("/register", async (req, res) => {
  const { pharmacy_password, pharmacy_username, ...pharmacyData } = req.body;
  try {
    const existingPharmacy = await Pharmacy.findOne({
      pharmacy_username: pharmacy_username,
    });
    if (existingPharmacy) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pharmacy_password, salt);
    const pharmacy = new Pharmacy({
      ...pharmacyData,
      pharmacy_password_hash: hashedPassword,
      pharmacy_username: pharmacy_username,
    });
    await pharmacy.save();
    res.status(201).json({ message: "Pharmacy Registered", pharmacy: pharmacy });
  } catch (error) {
    console.error(error);
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.pharmacy_username === 1
    ) {
      return res.status(400).json({ message: "Username already exists" });
    }
    res.status(500).json({ message: "Pharmacy registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { pharmacy_username, pharmacy_password } = req.body;

  try {
    const pharmacy = await Pharmacy.findOne({ pharmacy_username });
    if (!pharmacy) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(
      pharmacy_password,
      pharmacy.pharmacy_password_hash
    );
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: pharmacy._id, pharmacy_username: pharmacy.pharmacy_username },
      "ADAM"
    );
    res.json({
      token,
      pharmacyId: pharmacy._id,
      pharmacyName: pharmacy.pharmacy_username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
});

// Update an existing pharmacy
router.put("/:id", async (req, res) => {
  const pharmacy = await Pharmacy.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(pharmacy);
});

// Delete a pharmacy
router.delete("/:id", async (req, res) => {
  await Pharmacy.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
