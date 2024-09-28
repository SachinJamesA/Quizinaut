const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

// Load environment variables from .env file
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;  // Use MONGODB_URI now

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);  // Connect using the correct URI
        console.log('Connected To Mongo Successfully');
    } catch (error) {
        console.error('Error connecting to Mongo:', error);
    }
};

module.exports = connectToMongo;
