// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const QuizSubmit = () => {
//   const { id } = useParams();
//   const [quiz, setQuiz] = useState(null);
//   const [answers, setAnswers] = useState([]);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       const response = await axios.get(`/quiz/${id}`);
//       setQuiz(response.data);
//     };
//     fetchQuiz();
//   }, [id]);

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post(`/quiz/${id}/submit`, { answers });
//       alert(`Your score: ${response.data.score}`);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       {quiz ? (
//         <form onSubmit={handleSubmit}>
//           <h2>{quiz.title}</h2>
//           {quiz.questions.map((question, index) => (
//             <div key={index}>
//               <p>{question.text}</p>
//               {question.options.map((option, optIndex) => (
//                 <div key={optIndex}>
//                   <input
//                     type="radio"
//                     name={`question-${index}`}
//                     value={option.text}
//                     onChange={(e) => {
//                       const newAnswers = [...answers];
//                       newAnswers[index] = e.target.value;
//                       setAnswers(newAnswers);
//                     }}
//                   />
//                   {option.text}
//                 </div>
//               ))}
//             </div>
//           ))}
//           <button type="submit">Submit Quiz</button>
//         </form>
//       ) : (
//         <p>Loading quiz...</p>
//       )}
//     </div>
//   );
// };

// export default QuizSubmit;



// import React from 'react';
// import { useParams } from 'react-router-dom';

// const QuizSubmit = () => {
//   const { id } = useParams(); // Get quiz ID from URL

//   return (
//     <div>
//       <h1>Submit Quiz</h1>
//       <p>Submitting quiz with ID: {id}</p>
//       {/* Implement quiz submission logic here */}
//     </div>
//   );
// };

// export default QuizSubmit;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const QuizSubmit = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:5000/quiz/${id}`);
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };
    fetchQuiz();
  }, [id]);

  return (
    <div>
      <h1>Submit Quiz</h1>
      {quiz ? (
        <div>
          <h2>{quiz.title}</h2>
          {quiz.questions.map((question, index) => (
            <div key={index}>
              <h3>{question.text}</h3>
              {question.options.map((option, optIndex) => (
                <p key={optIndex}>{option}</p>
              ))}
              <p>Correct Answer: {question.correctAnswer}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading quiz...</p>
      )}
    </div>
  );
};

export default QuizSubmit;

