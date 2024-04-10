import axios from 'axios'

export const getallPost = async()=>{
  try {
   return await axios.get('http://localhost:4000/api/posts/getall')
  } catch (error) {
   throw error 
  }
}
export const createPost = async (formDataWithImage) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data' // Use 'multipart/form-data' for FormData
    };

    return await axios.post('http://localhost:4000/api/posts/create', formDataWithImage, { headers });
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getsinglepost = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    return await axios.get(`http://localhost:4000/api/posts/${id}/singlepost`, {headers});
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};
