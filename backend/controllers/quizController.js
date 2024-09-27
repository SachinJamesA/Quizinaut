const Quiz = require('../models/quizModel');
const Question = require('../models/questionModel');

// Create Quiz
exports.createQuiz = async (req, res) => {
  const { title, questions } = req.body;
  
  try {
    const newQuiz = new Quiz({
      title,
      createdBy: req.user._id,
      questions
    });
    
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Quiz by ID
exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('questions');
    res.status(200).json(quiz);
  } catch (err) {
    res.status(404).json({ error: 'Quiz not found' });
  }
};

// Submit Quiz Answers
exports.submitQuiz = async (req, res) => {
  const { answers } = req.body;
  const quiz = await Quiz.findById(req.params.id).populate('questions');
  
  const score = quiz.questions.reduce((total, question, index) => {
    if (question.correctAnswer.text === answers[index]) {
      return total + 1;
    }
    return total;
  }, 0);
  
  res.status(200).json({ score });
};
