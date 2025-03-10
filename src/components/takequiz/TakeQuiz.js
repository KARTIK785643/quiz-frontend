import React, { useState } from "react";
import "./quiz.css";
import "../styles/home.css";
import Navbar from "../firstpage/Navbar";
import axios from "axios";

const API_URL = "https://quiz-backend-1-5i3k.onrender.com/api/quizzes";

const TakeQuiz = () => {
  const [quizId, setQuizId] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizLoaded, setQuizLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuizSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      let id = quizId.trim();
      if (id.includes("/quiz/")) {
        id = id.split("/quiz/").pop().split("/")[0];
      } else if (id.includes("/")) {
        id = id.split("/").pop();
      }
      const response = await axios.get(`${API_URL}/${id}`);
      const quizData = response.data;
      if (!quizData || !quizData.questions || quizData.questions.length === 0) {
        throw new Error("Invalid quiz data format");
      }
      setSelectedQuiz(quizData);
      setQuizLoaded(true);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setScore(0);
      setQuizCompleted(false);
    } catch (error) {
      setError("Invalid Quiz ID or Link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedQuiz) return;
    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer || currentQuestion.answer;
    if (selectedOption === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuestionIndex + 1 < selectedQuiz.questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="quiz-container">
        {!quizLoaded ? (
          <div className="quiz-link-container">
            <h2>Enter Quiz ID or Link</h2>
            <input
              type="text"
              placeholder="Paste quiz ID or link here..."
              value={quizId}
              onChange={(e) => setQuizId(e.target.value)}
              className="quiz-link-input"
            />
            <button 
              onClick={handleQuizSubmit} 
              className="submit-link-btn"
              disabled={loading || !quizId.trim()}
            >
              {loading ? "Loading..." : "Start Quiz"}
            </button>
            {error && <p className="error-message">{error}</p>}
          </div>
        ) : quizCompleted ? (
          <div className="result">
            <h2>Quiz Completed!</h2>
            <p>Your Score: {score} / {selectedQuiz.questions.length}</p>
            <button onClick={() => setQuizLoaded(false)}>Take Another Quiz</button>
          </div>
        ) : (
          <div className="quiz-box">
            {selectedQuiz && (
              <div className="quiz-info">
                <h2>{selectedQuiz.title}</h2>
                <p>{selectedQuiz.description}</p>
                {selectedQuiz.image && <img src={selectedQuiz.image} alt="Quiz" className="quiz-image" />}
                {selectedQuiz.audio && (
                  <audio controls className="quiz-audio">
                    <source src={selectedQuiz.audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            )}
            {selectedQuiz?.questions && selectedQuiz.questions[currentQuestionIndex] ? (
              <>
                <h2 className="question-text">
                  Question {currentQuestionIndex + 1}: {selectedQuiz.questions[currentQuestionIndex].text}
                </h2>
                {selectedQuiz.questions[currentQuestionIndex].image && (
                  <img 
                    src={selectedQuiz.questions[currentQuestionIndex].image} 
                    alt="Question illustration" 
                    className="question-image"
                  />
                )}
                {selectedQuiz.questions[currentQuestionIndex].audio && (
                  <audio 
                    controls 
                    className="question-audio"
                    src={selectedQuiz.questions[currentQuestionIndex].audio}
                  >
                    Your browser does not support the audio element.
                  </audio>
                )}
                <div className="options">
                  {selectedQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                    <button
                      key={index}
                      className={`option-btn ${selectedOption === option ? "selected" : ""}`}
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={handleNext} 
                  className="next-btn"
                  disabled={selectedOption === null}
                >
                  {currentQuestionIndex === selectedQuiz.questions.length - 1 ? "Finish" : "Next"}
                </button>
              </>
            ) : (
              <h2>No Questions Available</h2>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TakeQuiz;
