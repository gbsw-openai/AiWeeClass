// authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};
