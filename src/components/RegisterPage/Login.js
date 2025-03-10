import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./sty.css";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting login with:", user.email);
      const response = await axios.post("https://quiz-backend-1-5i3k.onrender.com/api/login", user);
      
      console.log("Login response:", response.data);
      
      // Store the authentication token
      localStorage.setItem("token", response.data.token);
      
      // IMPORTANT: Store complete user information at login time
      // Create a username from email if not provided
      const username = response.data.username || user.email.split('@')[0];
      
      const userData = {
        username: username,
        email: user.email,
        // Include any other user fields you need in your profile
        name: response.data.name || username,
        id: response.data.id || response.data.userId || Date.now().toString()
      };
      
      // Store in localStorage for profile access
      localStorage.setItem("userData", JSON.stringify(userData));
      
      console.log("✅ User data stored in localStorage:", userData);
      
      alert("Login Successful!");
      navigate("/home");
    } catch (err) {
      console.error("❌ Login Error:", err);
      setError(err.response?.data?.error || "Invalid Credentials!");
    }
  };

  return (
    <div className="auth-container">
      <div className="login-form">
        <h2>Login</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="login-btn">Login</button>
        </form>
        
        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;