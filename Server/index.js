const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(express.json())
app.use(cors());
app.use(cookieParser());
const uri = 'mongodb+srv://adam:EPQfpcJi2hwnsCoW@cluster0.ujd6hhy.mongodb.net/Dawaa'; // replace with your own MongoDB connection string
const mongoose = require('mongoose');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB database'))
    .catch((err) => console.error('Error connecting to MongoDB database:', err));


// configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const Pharmacy = require("./models/Pharmacy.js")
// get all pharmacies
app.get('/pharmacies', async (req, res) => {
    const pharmacies = await Pharmacy.find();
    res.json(pharmacies);
});

// get a specific pharmacy by ID
app.get('/pharmacies/:id', async (req, res) => {
    const pharmacy = await Pharmacy.findById(req.params.id);
    res.json(pharmacy);
});

// create a new pharmacy
const bcrypt = require('bcrypt');

app.post('/pharmacies', async (req, res) => {
    const { pharmacy_password_hash, pharmacy_username, ...pharmacyData } = req.body;
    console.log(pharmacy_username)
    try {
        const existingPharmacy = await Pharmacy.findOne({ username: pharmacy_username });
        if (existingPharmacy) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Generate a salt with 10 rounds
        const salt = await bcrypt.genSalt(10);

        // Hash the password with the generated salt
        const hashedPassword = await bcrypt.hash(pharmacy_password_hash, salt);

        // Create a new pharmacy document with the hashed password
        const pharmacy = new Pharmacy({ ...pharmacyData, pharmacy_password_hash: hashedPassword, pharmacy_username: pharmacy_username });
        await pharmacy.save();
        res.json(pharmacy);
    } catch (error) {
        console.error(error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.pharmacy_username === 1) {
            // Duplicate key error
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Other error
        res.status(500).json({ message: 'Pharmacy registration failed' });
    }
});
// login 
const jwt = require('jsonwebtoken');

app.post('/login', async (req, res) => {
    const { pharmacy_username, pharmacy_password_hash } = req.body;

    try {
        // Find the user by username
        const pharmacy = await Pharmacy.findOne({ pharmacy_username });

        // If the user doesn't exist, return an error
        if (!pharmacy) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the password with the hashed password
        const match = await bcrypt.compare(pharmacy_password_hash, pharmacy.pharmacy_password_hash);

        // If the password doesn't match, return an error
        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token with the user ID and email as payload
        const token = jwt.sign({ id: pharmacy._id, pharmacy_username: pharmacy.pharmacy_username }, "ADAM");

        // Return the token as response
        res.json({ token, pharmacyId: pharmacy._id, pharmacyName: pharmacy.pharmacy_username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login failed' });
    }
});
// update an existing pharmacy
app.put('/pharmacies/:id', async (req, res) => {
    const pharmacy = await Pharmacy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(pharmacy);
});

// delete a pharmacy
app.delete('/pharmacies/:id', async (req, res) => {
    await Pharmacy.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});
const Medicine = require("./models/Medicine.js")
// get all medicines for a specific pharmacy
app.get('/pharmacies/:id/medicines', async (req, res) => {
    const medicines = await Medicine.find({ pharmacy_id: req.params.id });
    res.json(medicines);
});
app.get('/medicines', async (req, res) => {
    const medicines = await Medicine.find();
    res.json(medicines);
});
app.get('/medicines/:id', async (req, res) => {
    const medicines = await Medicine.find({ _id: req.params.id });
    res.json(medicines);
});


app.get('/medicines', async (req, res) => {
    const { search, priority } = req.query;
    const attributes = priority ? priority.split(',') : ['name', 'description', 'brand', 'category'];
    const regex = { $regex: search, $options: 'i' };

    try {
        const medicines = await Medicine.find({
            $or: attributes.map((attribute) => ({ [`medicine_${attribute}`]: regex })),
        });

        res.json(medicines);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while searching for medicines.' });
    }
});
// create a new medicine for a specific pharmacy
app.post('/pharmacies/:id/medicines', async (req, res) => {
    const medicine = new Medicine(req.body);
    medicine.pharmacy_id = req.params.id;
    await medicine.save();
    res.json(medicine);
});

// update an existing medicine for a specific pharmacy
app.put('/pharmacies/:id/medicines/:medicineId', async (req, res) => {
    const medicine = await Medicine.findByIdAndUpdate(req.params.medicineId, req.body, { new: true });
    res.json(medicine);
});

// delete a medicine for a specific pharmacy
app.delete('/pharmacies/:id/medicines/:medicineId', async (req, res) => {
    await Medicine.findByIdAndDelete(req.params.medicineId);
    res.sendStatus(204);
});

app.listen(3001, () => {
    console.log('Express server listening on port 3001');
});