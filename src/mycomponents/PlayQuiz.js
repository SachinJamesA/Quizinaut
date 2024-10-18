import React, { useState } from 'react';

const PlayQuiz = ({ quizData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  
  const currentQuestion = quizData.questions[currentQuestionIndex];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption) {
      if (selectedOption === currentQuestion.correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      }

      if (currentQuestionIndex + 1 < quizData.questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption('');
      } else {
        setShowResult(true);
      }
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption('');
  };

  return (
    <div className="quiz-container">
      <h2>{quizData.title}</h2>
      {!showResult ? (
        <form onSubmit={handleSubmit}>
          <p>{currentQuestion.text}</p>
          {currentQuestion.options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`option-${index}`}
                name="quiz"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
          <button type="submit" disabled={!selectedOption}>
            Next
          </button>
        </form>
      ) : (
        <div className="result">
          <h3>Your Score: {score}/{quizData.questions.length}</h3>
          <button onClick={handleRetry}>Retry</button>
        </div>
      )}
    </div>
  );
};

export default PlayQuiz;
