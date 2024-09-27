const express = require('express');
const { createQuiz, getQuiz, submitQuiz } = require('../controllers/quizController');
const router = express.Router();
const authenticate = require('../middleware/fetchuser');

router.post('/', authenticate, createQuiz);
router.get('/:id', authenticate, getQuiz);
router.post('/:id/submit', authenticate, submitQuiz);

module.exports = router;
