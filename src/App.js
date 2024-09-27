import "./App.css";
import { useState } from "react";
import Main from "./mycomponents/Main";
import Quizes from "./mycomponents/Quizes";
import Start from "./mycomponents/Start";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./mycomponents/Login";
import Signup from "./mycomponents/Signup";
import Alert from "./mycomponents/Alert";
import Dashboard from "./mycomponents/Dashboard";
import Feedback from "./mycomponents/Feedback";
import Navbar from "./mycomponents/Navbar";
import QuizForm from "./mycomponents/QuizForm";

// import QuizForm from "./mycomponents/QuizForm";
import QuizSubmit from "./mycomponents/QuizSubmit";
import QuizList from "./mycomponents/QuizList";

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
      <Navbar showAlert={showAlert}/>
      <Alert alert={alert}/>
      <Routes>
        {/* <Route element={<Alert />} alert={alert} /> */}
        <Route path="/" element={<Start showAlert={showAlert} />} />
        <Route path="/main" element={<Main />} />
        <Route path="/quizes" element={<Quizes />} />
        <Route path="/QuizForm" element={<QuizForm showAlert={showAlert} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/signup" element={<Signup showAlert={showAlert} />} />
        <Route path="/login" element={<Login showAlert={showAlert} />} />
        {/* <Route path="/QuizForm" element={<QuizForm />} /> */}
        <Route path="/QuizSubmit" element={<QuizSubmit />} />
        <Route path="/QuizList" element={<QuizList />} /> 
      </Routes>
    </Router>
  );
}

export default App;
