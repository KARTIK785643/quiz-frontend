import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css"; // ✅ Corrected path

function Card({ title, description, link }) {
  // Define button text based on the title
  const buttonTextMapping = {
    "Create a Quiz": "Create Quiz",
    "Start Quiz": "Start Quiz",
    "Leaderboard": "View Rankings",
  };

  const buttonText = buttonTextMapping[title] || "Click Here"; // Default text if title doesn't match

  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={link}>
        <button><p>{buttonText}</p></button>
      </Link>
    </div>
  );
}

export default Card;
