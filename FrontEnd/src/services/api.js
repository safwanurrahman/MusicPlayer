import axios from 'axios';

// Base URL for the backend API
const API_URL = "http://localhost:5000/api";

// Function to handle user login
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { username, password });
    return response.data;  // Returns success message or user data
  } catch (error) {
    throw error.response?.data || 'Login failed, please try again.';
  }
};

// Function to handle user signup
export const signupUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/create`, { username, password });
    return response.data;  // Returns success message or user ID
  } catch (error) {
    throw error.response?.data || 'Signup failed, please try again.';
  }
};

// Function to fetch songs from the backend
export const getSongs = async () => {
  try {
    const response = await axios.get(`${API_URL}/songs`);
    return response.data.songs;  // Returns the list of songs
  } catch (error) {
    throw error.response?.data || 'Failed to fetch songs.';
  }
};
