import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import Navbar from "../firstpage/Navbar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    // Function to get user data from localStorage
    const getUserData = () => {
      try {
        // Check for token first (required for authentication)
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found. Please log in again.");
        }
        
        // Get user data from localStorage
        const userDataString = localStorage.getItem("userData");
        if (!userDataString) {
          throw new Error("User profile data not found. Please log in again.");
        }
        
        const userData = JSON.parse(userDataString);
        console.log("✅ Retrieved user data from localStorage:", userData);
        
        // Validate required fields
        if (!userData.email) {
          throw new Error("User data is incomplete. Please log in again.");
        }
        
        // Check if there's a saved profile image in localStorage
        const savedImage = localStorage.getItem("userProfileImage");
        if (savedImage) {
          setImagePreview(savedImage);
        }
        
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error loading profile data:", error.message);
        setError(error.message);
        setLoading(false);
        
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };
    
    getUserData();
  }, [navigate]);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
      
      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        // Save the image in localStorage
        localStorage.setItem("userProfileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload (if you want to send it to a server later)
  const handleImageUpload = () => {
    if (uploadedImage) {
      alert("Image uploaded successfully!");
      // If you have a server endpoint for uploading images, you would handle that here
      // For now, we're just saving to localStorage
    } else {
      alert("Please select an image first");
    }
  };

  // Show loading state
  if (loading) {
    return <div className={styles.loading}>Loading profile...</div>;
  }
  
  // Show error state
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }
  
  // Show empty state
  if (!user) {
    return <div className={styles.error}>User profile not found</div>;
  }

  // Render profile when data is available
  return (
    <>
      <Navbar />
      <div className={styles.profileContainer}>
        <div className={styles.profileCard}>
          <div className={styles.profileImageSection}>
            <div className={styles.profileImageContainer}>
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Profile" 
                  className={styles.profileImage} 
                />
              ) : (
                <div className={styles.profileImagePlaceholder}>
                  {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                </div>
              )}
            </div>
            
            <div className={styles.imageUploadControls}>
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
                style={{ display: 'none' }}
              />
              <label htmlFor="profile-image" className={styles.uploadButton}>
                Choose Image
              </label>
              
              {uploadedImage && (
                <button 
                  onClick={handleImageUpload} 
                  className={styles.saveImageButton}
                >
                  Save Image
                </button>
              )}
            </div>
          </div>
          
          <h2 className={styles.profileTitle}>User Profile</h2>
          <div className={styles.profileInfo}>
            <div className={styles.profileField}>
              <span className={styles.fieldLabel}>Username:</span>
              <span className={styles.fieldValue}>{user.username || "N/A"}</span>
            </div>
            <div className={styles.profileField}>
              <span className={styles.fieldLabel}>Email:</span>
              <span className={styles.fieldValue}>{user.email}</span>
            </div>
            {user.name && user.name !== user.username && (
              <div className={styles.profileField}>
                <span className={styles.fieldLabel}>Name:</span>
                <span className={styles.fieldValue}>{user.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;