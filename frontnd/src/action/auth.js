import axios from  'axios';
export const register = async (username, email, password) => {
  try {
    const body = {username, email, password };
    return await axios.post(`http://localhost:4000/api/auth/register`, JSON.stringify(body));
  } catch (error) {
    console.log(error);
  }
};

export const login = async ( email, password) => {
  try {
    const body = { email, password };
    return await axios.post(`http://localhost:4000/api/auth/login`, JSON.stringify(body));
  } catch (error) {
    console.log(error);
  }
};

export const deleteuser = async (userId ) => {
  try {
    const body = {userId};
    return await axios.post(`http://localhost:4000/api/auth/deleteuser`, JSON.stringify(body));
  } catch (error) {
    console.log(error);
  }
};

export const updateuser = async (userId, newData ) => {
  try {
    const body = {userId, newData};
    return await axios.post(`http://localhost:4000/api/auth/updateuser`, JSON.stringify(body));
  } catch (error) {
    console.log(error);
  }
};