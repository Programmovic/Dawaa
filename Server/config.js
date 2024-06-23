const mongoose = require('mongoose');

const uri = 'mongodb+srv://adam:EPQfpcJi2hwnsCoW@cluster0.ujd6hhy.mongodb.net/Dawaa';

const connectDB = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB database');
    } catch (err) {
        console.error('Error connecting to MongoDB database:', err);
    }
};

module.exports = connectDB;
