require('dotenv').config({ path: './.env' });  // Explicitly load the .env file

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const mongoURI = process.env.MONGODB_URI;

console.log('Mongo URI:', mongoURI);  // Debugging step

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);  // Connect using the correct URI
        console.log('Connected To Mongo Successfully');
    } catch (error) {
        console.error('Error connecting to Mongo:', error);
    }
};

module.exports = connectToMongo;
MONGODB_URI = "mongodb://localhost:27017/Quizinaut?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
