const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ text: String }],
  correctAnswer: { text: String }
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
