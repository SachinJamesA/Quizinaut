// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// // Define the schema for quiz options
// const OptionSchema = new Schema({
//     text: {
//         type: String,
//         required: true,
//     },
// });

// // Define the schema for quiz questions
// const QuestionSchema = new Schema({
//     text: {
//         type: String,
//         required: true,
//     },
//     options: {
//         type: [OptionSchema],  // Array of options
//         required: true,
//     },
//     correctAnswer: {
//         type: String,
//         required: true, // or you could use an ObjectId if you want to link to the correct option
//     },
// });

// // Define the schema for quizzes
// const QuizSchema = new Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'user',
//         required: true, // Ensure that the quiz is associated with a user
//     },
//     title: {
//         type: String,
//         required: true,
//     },
//     questions: {
//         type: [QuestionSchema], // Array of questions
//         required: true,
//     },
//     date: {
//         type: Date,
//         default: Date.now,
//     },
// });

// module.exports = mongoose.model('Quiz', QuizSchema);


const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: { type: [String], required: true }, // This defines `options` as an array of strings
  correctAnswer: { type: String, required: true },
});

const quizSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  questions: { type: [questionSchema], required: true }, // `questions` is an array of `questionSchema`
});

module.exports = mongoose.model('Quiz', quizSchema);
