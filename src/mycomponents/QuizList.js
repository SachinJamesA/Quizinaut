// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const QuizList = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await axios.get('/quiz');
//         setQuizzes(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching quizzes:', error);
//         setLoading(false);
//       }
//     };

//     fetchQuizzes();
//   }, []);

//   if (loading) {
//     return <p>Loading quizzes...</p>;
//   }

//   return (
//     <div>
//       <h1>Available Quizzes</h1>
//       <ul>
//         {quizzes.length > 0 ? (
//           quizzes.map((quiz) => (
//             <li key={quiz._id}>
//               <h2>{quiz.title}</h2>
//               <Link to={`/quiz/${quiz._id}`}>Start Quiz</Link>
//             </li>
//           ))
//         ) : (
//           <p>No quizzes available. Please create one!</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default QuizList;


// import React from 'react';
// import { Link } from 'react-router-dom';

// const QuizList = () => {
//   // Sample quiz data (in a real application, this would be fetched from an API)
//   const quizzes = [
//     { _id: '1', title: 'Sample Quiz 1' },
//     { _id: '2', title: 'Sample Quiz 2' }
//   ];

//   return (
//     <div>
//       <h1>Available Quizzes</h1>
//       <ul>
//         {quizzes.length > 0 ? (
//           quizzes.map((quiz) => (
//             <li key={quiz._id}>
//               <h2>{quiz.title}</h2>
//               <Link to={`/quiz/${quiz._id}`}>Start Quiz</Link>
//             </li>
//           ))
//         ) : (
//           <p>No quizzes available. Please create one!</p>
//         )}
//       </ul>
//       <Link to="/create-quiz">
//         <button>Create New Quiz</button>
//       </Link>
//     </div>
//   );
// };

// export default QuizList;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('http://localhost:5000/quizzes');
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div>
      <h1>Available Quizzes</h1>
      <ul>
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <li key={quiz._id}>
              <h2>{quiz.title}</h2>
              <Link to={`/quiz/${quiz._id}`}>Start Quiz</Link>
            </li>
          ))
        ) : (
          <p>No quizzes available. Please create one!</p>
        )}
      </ul>
      <Link to="/create-quiz">
        <button>Create New Quiz</button>
      </Link>
    </div>
  );
};

export default QuizList;
