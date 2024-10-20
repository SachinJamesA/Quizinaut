import React from 'react';
import { Link } from 'react-router-dom';
import { FaLongArrowAltRight } from "react-icons/fa";

const Start = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-gray-800">
      <div className="max-w-screen-lg mx-auto p-8">
        {/* Header Section */}
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Quizinaut</h1>
          <Link to="/main">
            <button className="flex items-center bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300">
              Start Building Your Quiz <FaLongArrowAltRight className="ml-2" />
            </button>
          </Link>
        </div>

        {/* Hero Section */}
        <h1 className="text-5xl font-semibold text-center text-white mb-4">
          Quizzes That Correct Themselves
        </h1>
        <p className="text-lg text-center text-white mb-8">
          Your time is precious. Design the quiz, and we'll handle the rest.
        </p>

        {/* Introduction Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Why Choose Quizinaut?</h2>
          <p className="text-base text-gray-700 mb-4">
            At Quizinaut, we believe that creating quizzes should be easy and efficient. Our platform offers a seamless experience that allows you to focus on crafting engaging questions while we take care of the technical aspects.
          </p>
          <p className="text-base text-gray-700">
            Whether you're an educator looking to enhance your teaching methods, a corporate trainer aiming to engage your team, or a quiz enthusiast wanting to share knowledge, Quizinaut has the tools you need to succeed.
          </p>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Key Features</h2>
          <ul className="list-disc list-inside mb-4">
            <li className="text-gray-700">✨ **User-Friendly Interface**: Create quizzes in just a few clicks.</li>
            <li className="text-gray-700">📊 **Analytics and Insights**: Track the performance of your quizzes and understand user engagement.</li>
            <li className="text-gray-700">🔒 **Secure and Reliable**: Your data is safe with us, ensuring a smooth experience.</li>
            <li className="text-gray-700">💬 **Instant Feedback**: Get real-time feedback on your quizzes to improve them continuously.</li>
          </ul>
          <p className="text-base text-gray-700">
            Our mission is to empower you to create quizzes that not only test knowledge but also engage and educate users in a fun and interactive way.
          </p>
        </div>

        {/* Call to Action Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Get Started Today!</h2>
          <p className="text-base text-gray-700 mb-4">
            Join thousands of satisfied users who have transformed their quiz-making experience with Quizinaut. Whether you're creating quizzes for educational purposes, corporate training, or just for fun, we provide the tools to make it happen.
          </p>
          <p className="text-base text-gray-700">
            Click the button above to start building your first quiz and experience the difference with Quizinaut!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Start;
