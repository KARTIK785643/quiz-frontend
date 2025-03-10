// api.js - Place this in your frontend src folder

import axios from 'axios';

// Backend API URL
const API_BASE_URL = 'http://localhost:5000';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API endpoints
export const apiService = {
  // Auth
  register: (userData) => api.post('/register', userData),
  login: (credentials) => api.post('/login', credentials),
  getProfile: () => api.get('/profile'),
  
  // Quizzes
  getAllQuizzes: () => api.get('/api/quizzes'),
  getQuizById: (id) => api.get(`/api/quizzes/${id}`),
  createQuiz: (quizData) => api.post('/api/quizzes', quizData),
  updateQuiz: (id, quizData) => api.put(`/api/quizzes/${id}`, quizData),
  deleteQuiz: (id) => api.delete(`/api/quizzes/${id}`),
  getQuizLink: (id) => api.get(`/api/quizzes/${id}/link`),
};

export default api;