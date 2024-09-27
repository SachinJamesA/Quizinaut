// Quizzes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quiz, setQuiz] = useState({ title: '', options: [''], correctAnswer: '' });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    const response = await axios.get('http://localhost:5000/api/quizzes');
    setQuizzes(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...quiz.options];
    updatedOptions[index] = value;
    setQuiz((prev) => ({ ...prev, options: updatedOptions }));
  };

  const addOption = () => {
    setQuiz((prev) => ({ ...prev, options: [...prev.options, ''] }));
  };

  const deleteOption = (index) => {
    const updatedOptions = quiz.options.filter((_, i) => i !== index);
    setQuiz((prev) => ({ ...prev, options: updatedOptions }));
  };

  const saveQuiz = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`http://localhost:5000/api/quizzes/${editing}`, quiz);
    } else {
      await axios.post('http://localhost:5000/api/quizzes', quiz);
    }
    setQuiz({ title: '', options: [''], correctAnswer: '' });
    setEditing(null);
    fetchQuizzes();
  };

  const editQuiz = (quiz) => {
    setQuiz(quiz);
    setEditing(quiz._id);
  };

  const deleteQuiz = async (id) => {
    await axios.delete(`http://localhost:5000/api/quizzes/${id}`);
    fetchQuizzes();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Quizzes</h1>
      <form onSubmit={saveQuiz}>
        <input
          type="text"
          name="title"
          placeholder="Quiz Title"
          value={quiz.title}
          onChange={handleChange}
          className="p-2 border mb-2"
          required
        />
        {quiz.options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              className="p-2 border mr-2"
              required
            />
            <button type="button" onClick={() => deleteOption(index)} className="text-red-500">Delete</button>
          </div>
        ))}
        <button type="button" onClick={addOption} className="bg-blue-500 text-white p-2 rounded mb-4">Add Option</button>
        <input
          type="text"
          name="correctAnswer"
          placeholder="Correct Answer"
          value={quiz.correctAnswer}
          onChange={handleChange}
          className="p-2 border mb-4"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          {editing ? 'Update Quiz' : 'Create Quiz'}
        </button>
      </form>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Quizzes List</h2>
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz._id} className="flex justify-between items-center mb-2">
              <span>{quiz.title}</span>
              <div>
                <button onClick={() => editQuiz(quiz)} className="text-blue-500">Edit</button>
                <button onClick={() => deleteQuiz(quiz._id)} className="text-red-500 ml-2">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Quizzes;
