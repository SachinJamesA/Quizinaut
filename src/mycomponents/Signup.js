import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import eye icons from react-icons

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showCPassword, setShowCPassword] = useState(false); // State for confirm password visibility
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5001/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className='text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white'>
          Create an account to use Quizinaut
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={onChange}
              aria-describedby="nameHelp"
              placeholder="Enter your name"
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
            <input
              type="email"
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              id="email"
              name="email"
              onChange={onChange}
              aria-describedby="emailHelp"
              placeholder="Enter your email"
              required
            />
            <small id="emailHelp" className="form-text text-muted dark:text-gray-400">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="relative"> {/* Container with relative positioning */}
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white pr-10" // Add padding to the right for icon
              id="password"
              name="password"
              onChange={onChange}
              placeholder="Enter your Password"
              minLength={5}
              required
            />
            {/* Eye icon for toggling password visibility */}
            <span
              className="absolute right-3 top-[2.75rem] transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
            >
              {showPassword ? (
                <AiFillEyeInvisible size={24} className="text-gray-600 dark:text-gray-300" />
              ) : (
                <AiFillEye size={24} className="text-gray-600 dark:text-gray-300" />
              )}
            </span>
          </div>
          <div className="relative"> {/* Container for confirm password */}
            <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
            <input
              type={showCPassword ? "text" : "password"} // Toggle between text and password
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white pr-10" // Add padding to the right for icon
              id="cpassword"
              name="cpassword"
              onChange={onChange}
              placeholder="Confirm your Password"
              minLength={5}
              required
            />
            {/* Eye icon for toggling confirm password visibility */}
            <span
              className="absolute right-3 top-[2.75rem] transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowCPassword(!showCPassword)} // Toggle showCPassword state
            >
              {showCPassword ? (
                <AiFillEyeInvisible size={24} className="text-gray-600 dark:text-gray-300" />
              ) : (
                <AiFillEye size={24} className="text-gray-600 dark:text-gray-300" />
              )}
            </span>
          </div>
          <div>
            <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">
              Signup
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
