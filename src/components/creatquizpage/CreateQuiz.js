import React, { useState, useEffect } from "react";
import QuizForm from "./QuizForm";
import "./style.css";
import Navbar from "../firstpage/Navbar";
import axios from "axios";

const CreateQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizLinks, setQuizLinks] = useState({}); // Store generated links
  const [isLoading, setIsLoading] = useState(false);

  // Fetch quizzes from database on component mount
  useEffect(() => {
    setIsLoading(true);
    axios.get("https://quiz-backend-1-5i3k.onrender.com/api/quizzes") 

      .then(response => {
        setQuizzes(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching quizzes:", error);
        setIsLoading(false);
      });
  }, []);

  const handleQuizSubmit = async (quizData) => {
    try {
      setIsLoading(true);
      
      // Log the data being sent for debugging
      console.log("Submitting quiz data:", quizData);
      
      // Create a proper quiz object that matches the schema
      const quizToSubmit = {
        title: quizData.title,
        description: quizData.description,
        image: quizData.image,
        audio: quizData.audio,
        questions: quizData.questions.map(q => ({
          question: q.text, 
          options: q.options,
          correctAnswer: q.correctAnswer
        }))
      };
      
      // Check server connectivity first with a simple GET request
      try {
        await axios.get("http://localhost:5000/api/health");
        console.log("Server is reachable");
      } catch (connError) {
        console.error("Server connectivity issue:", connError);
        alert("Cannot connect to the server. Please check if the server is running.");
        setIsLoading(false);
        return;
      }
      
      // Send as JSON with timeout and explicit error handling
      const response = await axios.post(
        "https://quiz-backend-1-5i3k.onrender.com/api/quizzes", 
        quizToSubmit,
        {
          timeout: 10000, // 10 second timeout
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log("Server response:", response.data);
      
      // Rest of your code...
      const savedQuiz = response.data;
      setQuizzes(prevQuizzes => [...prevQuizzes, savedQuiz]);
      generateQuizLink(savedQuiz._id);
      setIsLoading(false);
      alert("Quiz created successfully!");
    } catch (error) {
      console.error("Full error object:", error);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server responded with error:", error.response.data);
        console.error("Status code:", error.response.status);
        alert(`Server error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        alert("Network error: No response from server. Please check if your server is running.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Request setup error:", error.message);
        alert(`Error: ${error.message}`);
      }
      
      setIsLoading(false);
    }
  };
  const generateQuizLink = (quizId) => {
    const link = `${window.location.origin}/quiz/${quizId}`;
    setQuizLinks(prev => ({ ...prev, [quizId]: link }));
  };

  const deleteQuiz = async (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        setIsLoading(true);
        await axios.delete(`https://quiz-backend-1-5i3k.onrender.com/api/quizzes/${quizId}`);
        
        // Remove from state
        setQuizzes(quizzes.filter(quiz => quiz._id !== quizId));
        
        // Remove link if exists
        const newQuizLinks = { ...quizLinks };
        delete newQuizLinks[quizId];
        setQuizLinks(newQuizLinks);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error deleting quiz:", error);
        setIsLoading(false);
        alert("Failed to delete quiz. Please try again.");
      }
    }
  };

  return (
    <div className="main-body">
      <Navbar />
      <div className="container">
        <h2>Create Quiz</h2>
        <QuizForm onSubmit={handleQuizSubmit} />
        
        <h3>Created Quizzes</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : quizzes.length > 0 ? (
          <ul className="quiz-list">
            {quizzes.map((quiz, index) => (
              <li key={quiz._id || index} className="quiz-item">
                <div className="quiz-info">
                  <strong>{quiz?.title || "Untitled Quiz"}</strong>
                  <p>{quiz?.description || "No description"}</p>
                  <p>Questions: {quiz?.questions?.length || 0}</p>
                  
                  {quiz.image && (
                    <div className="quiz-thumbnail">
                      <img 
                        src={quiz.image} 
                        alt="Quiz thumbnail" 
                        className="thumbnail" 
                      />
                    </div>
                  )}
                  
                  {quiz.audio && (
                    <div className="audio-preview">
                      <audio 
                        controls 
                        src={quiz.audio}
                        className="preview-audio"
                      ></audio>
                    </div>
                  )}
                </div>
                
                <div className="quiz-actions">
                  <button
                    className="generate-link-btn"
                    onClick={() => generateQuizLink(quiz._id)}
                  >
                    Generate Link
                  </button>
                  
                  <button
                    className="delete-btn"
                    onClick={() => deleteQuiz(quiz._id)}
                  >
                    Delete
                  </button>
                  
                  {quizLinks[quiz._id] && (
                    <div className="quiz-link">
                      <input 
                        type="text"
                        readOnly
                        value={quizLinks[quiz._id]}
                        className="link-input"
                      />
                      <button
                        className="copy-btn"
                        onClick={() => {
                          navigator.clipboard.writeText(quizLinks[quiz._id]);
                          alert('Link copied to clipboard!');
                        }}
                      >
                        Copy
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No quizzes created yet.</p>
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;