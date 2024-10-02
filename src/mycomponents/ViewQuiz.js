import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/solid'; // You can use heroicons for the arrow

const ViewQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:5001/quiz/${id}`);
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleAnswerSelect = (questionIndex, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers += 1;
      }
    });

    setScore(correctAnswers);
  };

//   const handleRefresh = () => {
//     // Clear the answers and score
//     setAnswers({});
//     setScore(null);
//   };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen py-10 bg-gray-50 dark:bg-[rgb(14,16,21)]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)} // Navigates back to the previous page
          className="flex items-center space-x-2 text-gray-700 dark:text-gray-400 mb-6"
        >
          <ArrowLeftIcon className="h-6 w-6" />
          <span>Go Back</span>
        </button>

        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          {quiz.title}
        </h1>

        <form onSubmit={handleSubmit}>
          {quiz.questions.map((question, index) => (
            <div key={index} className="mb-6 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {question.text}
              </h3>
              <div>
                {question.options.map((option, optIndex) => {
                  const isSelected = answers[index] === option; // Check if this option is selected
                  const isCorrect = option === question.correctAnswer; // Check if the option is correct
                  const isSubmitted = score !== null; // Check if the quiz has been submitted
                  return (
                    <label
                      key={optIndex}
                      className={`block mb-2 text-gray-700 dark:text-gray-400 cursor-pointer p-2 rounded-lg ${isSelected ? 'bg-blue-100 dark:bg-blue-800' : 'hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                      onClick={isSubmitted ? null : () => handleAnswerSelect(index, option)} // Prevent selection after submission
                    >
                      {/* Use letters A, B, C, etc. for options */}
                      <span className="font-medium">{String.fromCharCode(65 + optIndex)}. {option}</span>
                      {isSubmitted && (
                        <span className={`ml-2 font-semibold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Submit Quiz
          </button>
        </form>

        {score !== null && (
          <div className="mt-6 text-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Your Result
            </h2>
            <p className="text-lg font-bold text-gray-800 dark:text-white">
              You scored {score} out of {quiz.questions.length}
            </p>
            <div className="mt-4">
              {quiz.questions.map((question, index) => (
                <div key={index} className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-400">
                    {question.text} 
                    <span className="font-semibold"> (Your Answer: {String.fromCharCode(65 + question.options.indexOf(answers[index]))})</span>
                  </span>
                  <span className={`font-semibold ${answers[index] === question.correctAnswer ? 'text-green-500' : 'text-red-500'}`}>
                    {answers[index] === question.correctAnswer ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Refresh Button */}
        {/* <button
          onClick={handleRefresh}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Refresh Quiz
        </button> */}
      </div>
    </div>
  );
};

export default ViewQuiz;
