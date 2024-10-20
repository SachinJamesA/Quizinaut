import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const QuizPlay = () => {
  const { quizId } = useParams(); // Get quiz ID from URL
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [resultMessage, setResultMessage] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if the question is submitted

  useEffect(() => {
    // Fetch the quiz data based on quizId
    const fetchQuizData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5001/api/quiz/${quizId}`, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch quiz data");
        }

        const data = await response.json();
        setQuizData(data); // Set the fetched quiz data
        setLoading(false); // Data is loaded
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  if (loading) {
    return <p className="text-center text-xl text-gray-600 dark:text-gray-200">Loading quiz...</p>;
  }

  if (!quizData || !quizData.questions) {
    return <p className="text-center text-xl text-red-500">No quiz data available</p>;
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setResultMessage(''); // Reset result message when changing options
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption) {
      if (selectedOption === currentQuestion.correctAnswer) {
        setScore((prevScore) => prevScore + 1);
        setResultMessage('Correct! 🎉');
      } else {
        setResultMessage(`Wrong! The correct answer is: ${currentQuestion.correctAnswer}`);
      }
      setIsSubmitted(true); // Mark the question as submitted
    }
  };

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedOption('');
    setResultMessage('');
    setIsSubmitted(false); // Reset submission state for the next question
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption('');
    setResultMessage('');
    setIsSubmitted(false); // Reset submission state for retry
  };

  const handleBack = () => {
    navigate(-1); // Go back one step in history
  };

  return (
    <div className="quiz-container min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 relative">
        {/* Back Button with Left Arrow and Text */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          aria-label="Back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M10.293 15.293a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586V3a1 1 0 012 0v9.586l4.293-4.293a1 1 0 011.414 1.414l-4 4z" clipRule="evenodd" />
          </svg>
          <span>Back</span>
        </button>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">{quizData.title}</h2>

        {!showResult ? (
          <>
            <form onSubmit={handleSubmit}>
              <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">{currentQuestion.text}</p>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name="quiz"
                      value={option}
                      checked={selectedOption === option}
                      onChange={handleOptionChange}
                      disabled={isSubmitted} // Disable options after submission
                      className="mr-2 focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor={`option-${index}`} className="text-gray-800 dark:text-gray-200">{option}</label>
                  </div>
                ))}
              </div>

              {/* Display result message */}
              {resultMessage && (
                <p className={`mt-4 text-lg ${resultMessage.includes('Correct') ? 'text-green-500' : 'text-red-500'}`}>
                  {resultMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={!selectedOption}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
              >
                Submit
              </button>
            </form>

            {/* Show Next button if there are more questions */}
            {resultMessage && currentQuestionIndex + 1 < quizData.questions.length && (
              <button
                onClick={handleNext}
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg"
              >
                Next Question
              </button>
            )}

            {/* Show the result after the last question */}
            {resultMessage && currentQuestionIndex + 1 === quizData.questions.length && (
              <button
                onClick={() => setShowResult(true)}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg"
              >
                Show Result
              </button>
            )}
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Final Score: {score}/{quizData.questions.length}
            </h3>
            <button
              onClick={handleRetry}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPlay;
