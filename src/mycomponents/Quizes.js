import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Quizes = () => {
  const [quizzes, setQuizzes] = useState([]);

  // Fetch quizzes from the API
  const fetchQuizzes = async () => {
    try {
      const response = await fetch("http://localhost:5001/quizzes"); // Update with your API endpoint
      const data = await response.json();
      setQuizzes(data); // Assuming the API returns an array of quizzes
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="dark:dark:bg-[rgb(14,16,21)]">
      <div className="w-full">
        <div className="w-[70%] mx-auto lg:pt-3 border-x-2 border-solid border-black dark:border-b-[1px] dark:border-[hsl(214.3_31.8%_18.4%)]">
          <div className="flex items-center justify-around mb-8">
            <h1 className="text-3xl font-bold border-b-2 pb-2 border-solid border-[hsl(214.3 31.8% 91.4%)] dark:text-white dark:border-b-[1.5px] dark:border-[hsl(214.3_31.8%_18.4%)]">
              Quiz
            </h1>
            <Link to="/quizForm">
              <div className="text-sm font-medium cursor-pointer bg-[#4668DF] hover:bg-[#5a79e9] p-3 rounded-lg text-white">
                Create Quiz
              </div>
            </Link>
          </div>
          <div className="flex flex-col mt-6">
            {quizzes.length === 0 ? (
              <>
                <h2 className="text-xl font-semibold text-gray-700 mb-4 dark:text-white">
                  You have no quizzes yet.
                </h2>
                <Link to="/quizForm">
                  <div className="navLink text-sm font-medium cursor-pointer bg-[#4668DF] hover:bg-[#5a79e9] p-3 rounded-lg text-white">
                    Create Quiz
                  </div>
                </Link>
              </>
            ) : (
              <div>
                {quizzes.map((quiz) => (
                  <div key={quiz._id} className="quiz-item">
                    {" "}
                    {/* Assuming quiz._id is the unique identifier */}
                    <h3 className="text-lg font-semibold">{quiz.title}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quizes;
