import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home"; 
import CreateQuiz from "./components/creatquizpage/CreateQuiz";
import TakeQuiz from "./components/takequiz/TakeQuiz";
import Ranking from "./components/ranking/Ranking";
import Profile from "./components/profilepage/Profile";
import About from "./components/Aboutpage/About";
import Landing from "./components/LandingPage/Landing";
import Register from "./components/RegisterPage/Register";
import Login from "./components/RegisterPage/Login";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Landing />} />
      
        <Route path="/home" element={<Home />} />
        <Route path="/createquiz" element={<CreateQuiz />} />
        <Route path="/takequiz" element={<TakeQuiz />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
