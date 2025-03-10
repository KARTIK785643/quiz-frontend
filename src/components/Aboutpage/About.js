import React from "react";

import "./About.css";
import Navbar from "../firstpage/Navbar"; // Import Navbar component

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <h1 className="about-title">About Our Quiz System</h1>
        <p className="about-description">
          Welcome to our interactive quiz platform! This system allows users to 
          test their knowledge on various topics with fun and engaging quizzes. 
          Whether you're preparing for an exam, improving your skills, or just having fun, 
          our quiz system provides an enjoyable learning experience.
        </p>

        <div className="about-section">
          <h2>Features of Our Quiz System</h2>
          <ul>
            <li>📌 Select from a variety of quizzes on different topics.</li>
            <li>📌 Track your progress with real-time scoring.</li>
            <li>📌 Instant feedback after answering questions.</li>
            <li>📌 User-friendly interface for smooth navigation.</li>
            <li>📌 Store quizzes locally for easy access.</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Why Choose Us?</h2>
          <p>
            Our quiz system is designed to make learning fun, engaging, and 
            accessible for everyone. Whether you're a student, a professional, 
            or just someone who loves quizzes, we ensure a seamless experience 
            with high-quality questions and an intuitive interface.
          </p>
        </div>

        <div className="about-footer">
          <p>© 2025 MediQuiz | Developed with ❤️ by Kartik</p>
        </div>
      </div>
    </>
  );
};

export default About;
