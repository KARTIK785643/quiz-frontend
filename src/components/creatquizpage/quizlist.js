import React from "react";

const quizlist = ({ quizzes }) => {
  return (
    <div>
      <h2>Quiz List</h2>
      {quizzes.length === 0 ? <p>No quizzes created yet.</p> : (
        <ul>
          {/* Display Quiz Image */}
{selectedQuiz.image && (
  <img src={selectedQuiz.image} alt="Quiz" className="quiz-image" />
)}

          {quizzes.map((quiz, index) => (
            <li key={index}>
              <strong>{quiz.title}</strong> - {quiz.description}
              <ul>
                {quiz.questions.map((q, qIndex) => (
                  <li key={qIndex}>{q.text} ({q.type})</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default quizlist;