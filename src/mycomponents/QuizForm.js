import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizForm = (props) => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ text: '', options: ['', ''], correctAnswer: '' }]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting quiz:", { title, questions }); // Debugging line
    try {
      const response = await fetch('http://localhost:5001/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, questions }),
      });
      
      if (response.ok) {
        props.showAlert('Quiz created successfully', 'success');
        navigate('/'); // Redirect to QuizList after successful creation
      } else {
        throw new Error('Failed to create quiz');
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
      props.showAlert('Failed To Create Quiz', 'danger');
    }
  };

  const handleQuestionChange = (index, field, value) => {
    console.log(`Changing question ${index} field ${field} to: ${value}`); // Debugging line
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', ''], correctAnswer: '' }]);
  };

  const addOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push(''); // Add empty option
    setQuestions(newQuestions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => {
          console.log("Title changed to:", e.target.value); // Debugging line
          setTitle(e.target.value);
        }}
        placeholder="Quiz Title"
        required
      />
      {questions.map((question, index) => (
        <div key={index}>
          <input
            value={question.text}
            onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
            placeholder={`Question ${index + 1}`}
            required
          />
          {question.options.map((option, optIndex) => (
            <input
              key={optIndex}
              value={option}
              onChange={(e) => {
                const newOptions = [...question.options];
                newOptions[optIndex] = e.target.value;
                handleQuestionChange(index, 'options', newOptions);
              }}
              placeholder={`Option ${optIndex + 1}`}
              required
            />
          ))}
          <button type="button" onClick={() => addOption(index)}>Add Option</button>
          <input
            value={question.correctAnswer}
            onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
            placeholder="Correct Answer"
            required
          />
        </div>
      ))}
      <button type="button" onClick={addQuestion}>Add New Question</button>
      <button type="submit">Create Quiz</button>
    </form>
  );
};

export default QuizForm;
