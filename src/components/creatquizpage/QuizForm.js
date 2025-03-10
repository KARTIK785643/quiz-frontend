import React, { useState } from "react";
import "./style.css";

const QuizForm = ({ onSubmit }) => {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    image: null,
    audio: null,
    questions: [],
  });

  const [question, setQuestion] = useState({
    text: "",
    type: "multiple-choice",
    options: ["", ""],
    correctAnswer: "",
  });

  const handleQuizChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQuiz({ ...quiz, [e.target.name]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    setQuestion({ ...question, options: newOptions });
  };

  const handleAddOption = () => {
    if (question.options.length < 5) {
      setQuestion({ ...question, options: [...question.options, ""] });
    }
  };

  const handleRemoveOption = (index) => {
    const newOptions = question.options.filter((_, i) => i !== index);
    setQuestion({ ...question, options: newOptions });
  };

  const handleAddQuestion = () => {
    if (!question.text.trim() || !question.correctAnswer.trim()) {
      alert("Please enter a question and select a correct answer.");
      return;
    }

    setQuiz({ ...quiz, questions: [...quiz.questions, question] });

    // Reset question state
    setQuestion({
      text: "",
      type: "multiple-choice",
      options: ["", ""],
      correctAnswer: "",
    });
  };

  const handleSubmitQuiz = () => {
    if (quiz.questions.length === 0) {
      alert("Please add at least one question before submitting.");
      return;
    }

    // Call the onSubmit prop with the quiz data
    onSubmit(quiz);
    
    // Reset the form after submission
    setQuiz({
      title: "",
      description: "",
      image: null,
      audio: null,
      questions: [],
    });
  };

  return (
    <div className="quiz-form-container">
      <h3>Quiz Details</h3>
      <input
        type="text"
        name="title"
        value={quiz.title}
        onChange={handleQuizChange}
        placeholder="Quiz Title"
      />
      <textarea
        name="description"
        value={quiz.description}
        onChange={handleQuizChange}
        placeholder="Quiz Description"
      />

      <label>Upload Quiz Image:</label>
      <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
      {quiz.image && <img src={quiz.image} alt="Quiz Preview" className="preview-image" />}

      <label>Upload Quiz Audio:</label>
      <input type="file" name="audio" accept="audio/*" onChange={handleFileChange} />
      {quiz.audio && <audio controls src={quiz.audio} className="preview-audio"></audio>}

      <h3>Add Question</h3>
      <input
        type="text"
        name="text"
        value={question.text}
        onChange={handleQuestionChange}
        placeholder="Enter question text"
      />

      <h4>Options:</h4>
      {question.options.map((option, index) => (
        <div key={index} className="option-container">
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
          />
          <input
            type="radio"
            name="correctAnswer"
            value={option}
            checked={question.correctAnswer === option}
            onChange={() => setQuestion({ ...question, correctAnswer: option })}
          />
          {question.options.length > 2 && (
            <button type="button" onClick={() => handleRemoveOption(index)} className="remove-btn">
              X
            </button>
          )}
        </div>
      ))}
      {question.options.length < 5 && (
        <button type="button" onClick={handleAddOption}>
          + Add Option
        </button>
      )}

      <button onClick={handleAddQuestion}>Add Question</button>
      <button onClick={handleSubmitQuiz}>Submit Quiz</button>

      <div className="quiz-summary">
        <h3>Current Quiz Questions: {quiz.questions.length}</h3>
        {quiz.questions.length > 0 && (
          <ul>
            {quiz.questions.map((q, index) => (
              <li key={index}>{q.text}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QuizForm;