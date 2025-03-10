import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css"; // Ensure the CSS path is correct

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if the user is logged in

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/logout", { method: "POST" }); // Call logout API
      localStorage.removeItem("token"); // Remove token from localStorage
      alert("Logout Successful!");
      navigate("/"); // Redirect to Landing Page after logout
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  return (
    <nav className="navbar">
      <h1 className="logo">MediQuiz</h1>
      <ul className="nav-links">
      {token && <li><Link to="/home" className="nav-item">Home</Link></li>} {/* Show only when logged in */}
      <li><Link to="/about" className="nav-item">About</Link></li>
       {token && <li><Link to="/profile" className="nav-item">Profile</Link></li>}

        {token ? (
          <li><Link to="/landing" className="nav-item" onClick={handleLogout}>Logout</Link></li>
        ) : (
          <li><Link to="/login" className="nav-item">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
