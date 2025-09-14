import axios from 'axios';

const API_URL = 'https://edu-master-delta.vercel.app/auth'; 

const register = (fullName, email, password, phoneNumber, classLevel) => {
  return axios.post(`${API_URL}/signup`, { fullName, email, password, cpassword: password, phoneNumber, classLevel });
};

const login = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};


// const logout = () => { ... };

export default {
  register,
  login,
};
