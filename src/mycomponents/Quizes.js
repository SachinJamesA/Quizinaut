import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Quizes = (props) => {
  const [quizzes, setQuizzes] = useState([]);

  const fetchQuizzes = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (!token) throw new Error("No token found"); // Ensure token exists

      const response = await fetch("http://localhost:5001/api/quiz/quizzes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token, // Include the token in the auth-token header
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch quizzes");
      }

      const data = await response.json();
      setQuizzes(data); // Assuming the API returns an array of quizzes
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const deleteQuiz = async (quizId) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (!token) throw new Error("No token found"); // Ensure token exists

      const response = await fetch(`http://localhost:5001/api/quiz/${quizId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token, // Include the token in the auth-token header
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete quiz");
      }

      // Update state to remove the deleted quiz
      setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz._id !== quizId));
      props.showAlert('Quiz Deleted successfully', 'danger');
    } catch (error) {
      console.error("Error deleting quiz:", error);
      props.showAlert('Error deleting quiz', 'danger');
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen dark:bg-[rgb(14,16,21)] flex items-center justify-center">
      <div className="w-[90%] lg:w-[70%] border-2 border-solid border-gray-300 dark:border-gray-700 rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between mb-10 px-6 py-4 border-b-2 border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Quizzes</h1>
          <Link to="/quizForm">
            <div className="text-sm font-medium cursor-pointer bg-[#4668DF] hover:bg-[#5a79e9] p-3 rounded-lg text-white">
              Create Quiz
            </div>
          </Link>
        </div>
        <div className="flex flex-col p-6">
          {quizzes.length === 0 ? (
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 dark:text-white">
                You have no quizzes yet.
              </h2>
              <Link to="/quizForm">
                <div className="navLink text-sm font-medium cursor-pointer bg-[#4668DF] hover:bg-[#5a79e9] p-3 rounded-lg text-white">
                  Create Quiz
                </div>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {quizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="quiz-item border rounded-lg p-4 bg-gray-100 dark:bg-gray-700 shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{quiz.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{quiz.description}</p>
                  <div className="mt-4 flex justify-between">
                    <Link to="/playquiz">
                      <button className="bg-[#4668DF] hover:bg-[#5a79e9] text-white p-2 rounded-lg">
                        Play Quiz
                      </button>
                    </Link>
                    <button 
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg" 
                      onClick={() => deleteQuiz(quiz._id)}
                    >
                      Delete Quiz
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quizes;
