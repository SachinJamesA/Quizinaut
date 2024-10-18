const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectToMongo = require('./db');
const fetchUser = require('./middleware/fetchuser');  // Import middleware to fetch user
const User = require('./models/User');  // Assuming you have a User model for authentication

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3001' // Change this to your frontend URL
}));

// Import the auth routes
app.use('/api/auth', require('./routes/auth'));  // Ensure this path is correct
app.use('/api/quiz', require('./routes/quiz'));  // Ensure this path is correct

// Import the quiz routes
// const quizRoutes = require('./routes/quiz'); // Ensure the path is correct
// app.use('/api/quizzes', quizRoutes); // Adjust the route path as necessary


app.use(express.json());
// Connect to MongoDB
connectToMongo();  // Connect to MongoDB when the server starts

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
