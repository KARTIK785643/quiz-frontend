import React from "react";
import Navbar from "../firstpage/Navbar";
import Footer from "../firstpage/Footer";
import Card from "../firstpage/Card";
import "../styles/home.css";

function Home() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <div className="card-container">
          <Card 
            title="Create Quiz" 
            description="Make your own quiz and test knowledge!" 
            buttonText="Create Quiz" 
            link="/CreateQuiz"
          />
          <Card 
            title="Start Quiz" 
            description="Attempt quizzes and see how well you score!" 
            buttonText="Start Quiz" 
            link="/takequiz"
          />
          <Card 
            title="Leaderboard" 
            description="View top scores and challenge others!" 
            buttonText="View Rankings" 
            link="/ranking"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
