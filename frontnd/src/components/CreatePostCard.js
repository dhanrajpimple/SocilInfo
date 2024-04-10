import React, { useState, useEffect } from 'react';
import { createPost } from '../action/post';


const CreatePostCard = () => {

const [userId, setUserId] = useState("");
   const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    image: null, 
    userId
  });


  useEffect(() => {

    const store = localStorage.getItem('userId');

    if (store) {
     
      setUserId(store);
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('title', formData.title);
      formDataWithImage.append('description', formData.description);
      formDataWithImage.append('category', formData.category);
      formDataWithImage.append('tags', formData.tags);
      formDataWithImage.append('image', formData.image);
      formDataWithImage.append('userId', userId);
      
      const response = await createPost(formDataWithImage)
     
      if (response.data.success) {
        console.log('Post created successfully!');
       
      } else {
        console.error('Failed to create post:', response.statusText);
        // Handle error as needed
      }
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle error as needed
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter post title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter post description"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter post category"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700 font-bold mb-2">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter post tags (comma-separated)"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostCard;
