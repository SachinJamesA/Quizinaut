// require('dotenv').config();  // No need to specify path if it's in the root

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);  // Disable deprecation warnings for query strictness

const mongoURI = "mongodb://localhost:27017/Quizinaut?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

// Debugging: log the Mongo URI (can be removed in production)
// console.log('Mongo URI:', mongoURI);
// console.log('Port:', process.env.PORT);



const connectToMongo = async () => {
    try {
        if (!mongoURI) {
            throw new Error('Mongo URI not found in .env file');
        }
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,        // Enable these options to handle connection properly
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);  // Exit the process with failure if unable to connect
    }
};

module.exports = connectToMongo;
