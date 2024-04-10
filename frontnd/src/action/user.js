import axios from 'axios';

const getToken = () => {
  return localStorage.getItem('token');
};

export const like = async (postId, userId) => {
  try {
    const body={ userId
    }
    const token = localStorage.getItem('token');
    return await axios.post(`http://localhost:4000/api/users/${postId}/like`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    throw error;
  }
};

export const unlike = async (postId, userId) => {
  try {
    const body ={userId}
    const token = localStorage.getItem('token');
    return await axios.post(`http://localhost:4000/api/users/${postId}/unlike` , body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    throw error;
  }
};

export const getLike = async (postId) => {
  try {
    const token = getToken();
    return await axios.get(`http://localhost:4000/api/users/${postId}/getlike`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    throw error;
  }
};

export const follow = async (actionuser, userId) => {
  try {
    const body ={
      actionuser, userId
    }
    console.log(body);
    const token = getToken();
    return await axios.post(`http://localhost:4000/api/users/follow`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    throw error;
  }
};

export const unfollow = async (actionuser, userId) => {
  try {
    const body ={
      actionuser, userId
    }
    const token = getToken();
    return await axios.post(`http://localhost:4000/api/users/unfollow`,body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    throw error;
  }
};

export const comment = async (id, userId, text) => {
  try {
    const body ={
       userId, text
    }
    const token = getToken();
    return await axios.post(`http://localhost:4000/api/users/${id}/comment`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    throw error;
  }
};

export const allcomment = async (postId) => {
  try {
    const token = getToken();
    return await axios.get(`http://localhost:4000/api/users/${postId}/allcomment`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    throw error;
  }
};

export const updateComment = async (postId) => {
  try {
    const token = getToken();
    return await axios.put(`http://localhost:4000/api/users/${postId}/updatecomment`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (postId) => {
  try {
    const token = getToken();
    return await axios.delete(`http://localhost:4000/api/users/${postId}/deletecomment`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    throw error;
  }
};
