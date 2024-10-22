import React from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-screen-lg mx-auto p-8">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 text-center md:text-left">
            Quizinaut
          </h1>

          <Link to="/main">
            <button className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 text-sm md:text-base">
              Start Building Your Quiz
              <FaLongArrowAltRight className="ml-2" />
            </button>
          </Link>
        </header>

        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-5xl font-semibold text-blue-600 mb-4">
            Quizzes That Correct Themselves
          </h2>
          <p className="text-lg text-gray-700 mb-8 dark:text-gray-300">
            Your time is precious. Design the quiz, and we'll handle the rest.
          </p>
          <Link to="/main">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
              Create Your First Quiz
            </button>
          </Link>
        </section>

        {/* About Section */}
        <section className="bg-gray-100 rounded-lg shadow-lg p-6 mb-8 dark:bg-gray-800">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            About Quizinaut
          </h2>
          <p className="text-base text-gray-700 mb-4 dark:text-gray-300">
            Quizinaut is your go-to platform for creating interactive quizzes
            effortlessly. Whether you're an educator, trainer, or quiz
            enthusiast, our user-friendly tools allow you to craft engaging
            quizzes that are perfect for any audience.
          </p>
          <p className="text-base text-gray-700 mb-4 dark:text-gray-300">
            Our mission is to enhance the learning experience by providing a
            platform where quizzes can be designed quickly, with real-time
            feedback and analytics to help you improve over time.
          </p>
        </section>

        {/* Features Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Key Features
          </h2>
          <ul className="list-disc list-inside mb-4 dark:text-gray-300">
            <li className="text-gray-700 dark:text-gray-300">
              🌟 <strong>Intuitive Quiz Builder</strong>: Create quizzes with
              drag-and-drop simplicity.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              📈 <strong>Comprehensive Analytics</strong>: Analyze quiz results
              to measure user engagement and learning outcomes.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              🔐 <strong>Data Security</strong>: Your data is safe with our
              robust security protocols.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              🌍 <strong>Global Accessibility</strong>: Access your quizzes from
              anywhere, on any device.
            </li>
          </ul>
          <p className="text-base text-gray-700 dark:text-gray-300">
            Join a community of educators and learners who trust Quizinaut to
            deliver quality and efficiency in their quiz-making processes.
          </p>
        </section>

        {/* User Testimonials Section */}
        <section className="bg-gray-100 rounded-lg shadow-lg p-6 mb-8 dark:bg-gray-800">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            What Our Users Say
          </h2>
          <div className="mb-4">
            <p className="text-gray-700 italic dark:text-gray-300">
              “Quizinaut has transformed the way I teach. My students love the
              quizzes, and I can track their progress easily!”
            </p>
            <p className="text-sm text-gray-500">- Sarah K., Educator</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 italic dark:text-gray-300">
              “Creating quizzes is now a breeze. The analytics feature helps me
              understand how well my team is learning.”
            </p>
            <p className="text-sm text-gray-500">
              - David L., Corporate Trainer
            </p>
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Get Started in 3 Easy Steps
          </h2>
          <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300">
            <li className="mb-2">
              🔹 <strong>Sign Up</strong>: Create your free account and get
              access to all our features.
            </li>
            <li className="mb-2">
              🔹 <strong>Create a Quiz</strong>: Use our intuitive quiz builder
              to design your first quiz.
            </li>
            <li className="mb-2">
              🔹 <strong>Launch & Analyze</strong>: Share your quiz and analyze
              the results with our analytics tools.
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default Home;
