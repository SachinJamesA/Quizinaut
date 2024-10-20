import "./App.css";
import { useState } from "react";
import Quizes from "./mycomponents/Quizes";
import Start from "./mycomponents/Start";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./mycomponents/Login";
import Signup from "./mycomponents/Signup";
import Alert from "./mycomponents/Alert";
import Feedback from "./mycomponents/Feedback";
import Navbar from "./mycomponents/Navbar";
import QuizForm from "./mycomponents/QuizForm";
import PlayQuiz from "./mycomponents/PlayQuiz";
import Footer from "./mycomponents/Footer";
import QuizPlay from "./mycomponents/PlayQuiz";
import HomePage from "./mycomponents/Home";
import Home from "./mycomponents/Home";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <Router>
      <Navbar showAlert={showAlert} />
      <Alert alert={alert} />
      <Routes>
        <Route path="/" element={<Start showAlert={showAlert} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quizes" element={<Quizes showAlert={showAlert} />} />
        <Route path="/QuizForm" element={<QuizForm showAlert={showAlert} />} />
        <Route path="/playquiz" element={<PlayQuiz />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/signup" element={<Signup showAlert={showAlert} />} />
        <Route path="/login" element={<Login showAlert={showAlert} />} />

         {/* Pass the quizData prop to QuizPlay */}
         <Route path="/playquiz/:quizId" element={<QuizPlay />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
