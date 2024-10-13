import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

/**
 * Register a new user
 * @param data - User registration data
 */
export const register = async (data: any) => {
  try {
    const res = await axios.post(`${API_URL}/register`, data);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Login user
 * @param data - User login data
 */
export const login = async (data: any) => {
  try {
    const res = await axios.post(`${API_URL}/login`, data);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
