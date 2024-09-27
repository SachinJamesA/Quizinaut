const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const mongoURI = "mongodb://localhost:27017/Quizinaut?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
 // Change this string if you want to deploy it in some db

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);  // Use await for the promise as callback function is no longer available in new version
        console.log('Connected To Mongo Successfully');
    } catch (error) {
        console.error('Error connecting to Mongo:', error);
    }
};

module.exports = connectToMongo;
