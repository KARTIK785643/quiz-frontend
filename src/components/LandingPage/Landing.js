import React from "react";
import Navbar from "../firstpage/Navbar";
import Footer from "../firstpage/Footer";
// import "../styles/home.css";
import "../styles/landing.css";

function Home() {
  return (
    <div className="app-container">
      <Navbar />

      <div className="hero-section">
        <h1>Welcome to MediQuiz</h1>
        <p>Test your medical knowledge with our interactive quizzes and learn in a fun way!</p>
        <button className="start-quiz-btn"> What's up!
</button>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Why Choose MediQuiz?</h2>
        <div className="features-container">
          <div className="feature-box">
            <h3>Engaging Quizzes</h3>
            <p>Interactive and well-structured quizzes to enhance your medical knowledge.</p>
          </div>
          <div className="feature-box">
            <h3>Track Your Progress</h3>
            <p>Monitor your improvement with detailed performance reports.</p>
          </div>
          <div className="feature-box">
            <h3>Learn Anytime</h3>
            <p>Accessible anytime, anywhere on any device.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
