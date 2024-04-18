import React, { useEffect, useState } from 'react';
import { getUser } from '../action/auth';
import axios from 'axios';
import { getsinglepostId } from '../action/post';
import { Link } from 'react-router-dom';

const Home = () => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [post, setPost] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    if (storedToken) {
      setToken(storedToken);
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const data = await getUser(userId, token);
          if (data.data.success) {
            setUser(data.data.user);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          console.log('log3');
        }
      }
    };

    const fetchPost = async () => {
      try {
        const postData = await getsinglepostId(userId);
        console.log(postData);
        if (postData.data.success) {
          setPost(postData.data.posts);
        } else {
          console.log('Failed to fetch post data');
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchData();
    fetchPost();
  }, [userId, token]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <div className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold text-white">
              {user && user.username ? user.username.charAt(0).toUpperCase() : ''}
            </div>
          </div>
          <img
            src="https://source.unsplash.com/random/500x300"
            alt="Cover"
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="p-6 flex justify-center align-middle items-center">
          <div className="text-xl font-bold text-gray-800 m-2">
            {user.username}
          </div>
          <div className="m-2 flex items-center">
            {user && user.followers && (
              <span className="bg-purple-100 text-purple-800 py-1 px-3 rounded-full text-sm mr-2">
                {user.followers.length} Followers
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-8">
  <div className="flex flex-wrap -mx-4">
  <div className="max-w-4xl mx-auto mt-8">
  <h1 className="text-2xl font-semibold mb-4">Your Posts</h1>
  {post.length > 0 ? (
    <div className="flex flex-wrap -mx-4">
      {post.map((item) => (
        <div
          key={item._id}
          className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700 mb-4">{item.description}...</p>
              <div className="flex items-center justify-between">
                <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full flex items-center">
                  <i className="fas fa-comment mr-2"></i>
                  {item.comments.length} Comments
                </div>
                <div className="px-3 py-2 bg-blue-500 text-white font-bold rounded-br-lg">
                  <i className="fas fa-heart mr-2"></i>
                  {item.likes.length} Likes
                </div>
                <Link to={`/single-post/${item._id}`}>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Show More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <h1>No posts</h1>
  )}
</div>

  </div>
</div>

    </div>
  );
};

export default Home;