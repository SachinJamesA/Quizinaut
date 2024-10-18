import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlusCircle, AiOutlineCloseCircle, AiOutlineArrowLeft } from 'react-icons/ai'; // Include the left arrow icon

const QuizForm = (props) => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ text: '', options: ['', ''], correctAnswer: '' }]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/quiz/addquiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title, questions }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
      }

      props.showAlert('Quiz created successfully', 'success');
      navigate('/quizes'); // Redirect to Quizes component
    } catch (error) {
      console.error('Error creating quiz:', error);
      props.showAlert('Failed To Create Quiz', 'danger');
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', ''], correctAnswer: '' }]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
      setQuestions(newQuestions);
    }
  };

  const addOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push('');
    setQuestions(newQuestions);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)} // Navigate back one step
          className="flex items-center mb-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 transition duration-200"
        >
          <AiOutlineArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-semibold">Back</span>
        </button>
        
        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-3">
            <label htmlFor="quizTitle" className="block text-lg font-semibold text-gray-700 dark:text-white">
              Quiz Title
            </label>
            <input
              id="quizTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a catchy quiz title"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white transition duration-200 ease-in-out"
            />
          </div>

          {questions.map((question, index) => (
            <div key={index} className="relative border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 space-y-3 transition-transform duration-200 hover:shadow-md">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="absolute right-3 top-3 text-red-600 hover:text-red-700 dark:text-gray-400 dark:hover:text-gray-300 transition duration-200"
                >
                  <AiOutlineCloseCircle className="h-5 w-5" />
                </button>
              )}

              <div className="space-y-2">
                <label htmlFor={`question${index}`} className="block text-md font-medium text-gray-700 dark:text-white">
                  Question {index + 1}
                </label>
                <input
                  id={`question${index}`}
                  value={question.text}
                  onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                  placeholder={`Enter question ${index + 1}`}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white transition duration-200 ease-in-out"
                />
              </div>

              {question.options.map((option, optIndex) => (
                <div key={optIndex} className="space-y-2">
                  <label htmlFor={`option${index}${optIndex}`} className="block text-sm text-gray-600 dark:text-gray-300">
                    Option {optIndex + 1}
                  </label>
                  <input
                    id={`option${index}${optIndex}`}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...question.options];
                      newOptions[optIndex] = e.target.value;
                      handleQuestionChange(index, 'options', newOptions);
                    }}
                    placeholder={`Enter option ${optIndex + 1}`}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white transition duration-200 ease-in-out"
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={() => addOption(index)}
                className="mt-2 text-indigo-600 hover:text-indigo-700 hover:underline flex items-center space-x-1 transition-colors duration-150"
              >
                <AiOutlinePlusCircle className="h-5 w-5" />
                <span>Add Option</span>
              </button>

              <div className="space-y-2">
                <label htmlFor={`correctAnswer${index}`} className="block text-md font-medium text-gray-700 dark:text-white">
                  Correct Answer
                </label>
                <input
                  id={`correctAnswer${index}`}
                  value={question.correctAnswer}
                  onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                  placeholder="Enter the correct answer"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white transition duration-200 ease-in-out"
                />
              </div>
            </div>
          ))}

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={addQuestion}
              className="text-indigo-600 dark:text-white hover:text-indigo-700 dark:hover:text-gray-300 hover:underline flex items-center space-x-1 transition-colors duration-150"
            >
              <AiOutlinePlusCircle className="h-6 w-6" />
              <span>Add New Question</span>
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-5 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition duration-200 ease-in-out flex items-center justify-center"
          >
            Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizForm;
