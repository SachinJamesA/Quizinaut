const express = require('express');
const fetchUser = require('../middleware/fetchuser'); // Middleware to fetch user
const Quiz = require('../models/Quiz'); // Assuming you have a Quiz model

const router = express.Router();

// POST endpoint to create a new quiz (only for authenticated users)
router.post('/addquiz', fetchUser, async (req, res) => {
  try {
    const newQuiz = new Quiz({
      user: req.user.id, // Associate the quiz with the logged-in user
      title: req.body.title, // Ensure title is passed in the body
      questions: req.body.questions, // Ensure questions are passed in the body
    });
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET endpoint to retrieve all quizzes for the authenticated user
router.get('/quizzes', fetchUser, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ user: req.user.id }); // Only fetch quizzes created by the user
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET endpoint to retrieve a specific quiz by ID (only if it belongs to the user)
router.get('/:id', fetchUser, async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ _id: req.params.id, user: req.user.id }); // Ensure the quiz belongs to the user
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE endpoint to delete a quiz by ID (only if it belongs to the user)
router.delete('/:id', fetchUser, async (req, res) => {
  try {
    const quiz = await Quiz.findOneAndDelete({ _id: req.params.id, user: req.user.id }); // Ensure the quiz belongs to the user
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
