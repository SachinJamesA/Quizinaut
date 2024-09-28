const express = require('express');
const mongoose = require('mongoose');  // Add this line to import mongoose
const cors = require('cors');
const bodyParser = require('body-parser');
const connectToMongo = require('./db');  // Import the connection function

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectToMongo();  // Connect to MongoDB when the server starts

// Define Quiz schema and model
const quizSchema = new mongoose.Schema({
  title: String,
  questions: [
    {
      text: String,
      options: [String],
      correctAnswer: String,
    },
  ],
});

const Quiz = mongoose.model('Quiz', quizSchema);

// API endpoints

// POST endpoint to create a new quiz
app.post('/quiz', async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET endpoint to retrieve all quizzes
app.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET endpoint to retrieve a specific quiz by ID
app.get('/quiz/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE endpoint to delete a quiz by ID
app.delete('/quiz/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
