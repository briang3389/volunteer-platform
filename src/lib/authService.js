// src/lib/authService.js
import axios from 'axios';

import { userSession } from './sessionStore';

const API_URL = 'http://your-backend-url'; // Replace with your actual backend URL

export async function loginUser(credentials) {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data) {
      userSession.set(response.data); // Set session data on successful login
    }
    return response.data;
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
}

export function logoutUser() {
  userSession.set(null); // Clear session data on logout
}

export async function registerUser(userData) {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data) {
      userSession.set(response.data); // Set session data on successful registration
    }
    return response.data;
  } catch (error) {
    console.error("Registration error", error);
    throw error;
  }
}
