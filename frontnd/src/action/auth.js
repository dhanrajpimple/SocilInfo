import axios from 'axios';


const getToken = () => {
  return localStorage.getItem('token');
};

export const register = async (formData) => {
  try {
    const body = formData;
    return await axios.post('http://localhost:4000/api/auth/register', body);
  } catch (error) {
    throw error;
  }
};

export const login = async (formData) => {
  try {
    return await axios.post('http://localhost:4000/api/auth/login', formData);
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    return await axios.delete(`http://localhost:4000/api/auth/users/${userId}`);
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId, newData) => {
  try {
    return await axios.put(`http://localhost:4000/api/auth/users/${userId}`, newData);
  } catch (error) {
    throw error;
  }
};


export const getUser = async (userId) => {
  try {
    return await axios.post('http://localhost:4000/api/auth/getuser', {userId});
  } catch (error) {
    throw error;
  }
};
