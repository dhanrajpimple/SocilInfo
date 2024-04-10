import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import { getallPost } from '../action/post';

const PostCard = () => {
  const [posts, setPosts] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getallPost();
        console.log(data, 'this is data');
        const response = data.data;
        console.log(response, 'data');
        if (response.success) {
          setPosts(response.data);
        } else {
          console.error('Failed to fetch posts:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const renderPostCards = () => {
    return posts.map((post) => {
      const { _id, title, image, description, likes, comments } = post;
      const shortDescription = description.split(' ').slice(0, 10).join(' ');
      return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
          <div className="relative">
            <img src={image} alt={title} className="w-full h-40 object-cover" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-700 mb-4">{shortDescription}...</p>
            <div className="flex items-center justify-between">
              <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full flex items-center">
                <i className="fas fa-comment mr-2"></i> {comments.length} Comments
              </div>
              <div className="px-3 py-2 bg-blue-500 text-white font-bold rounded-br-lg">
                <i className="fas fa-heart mr-2"></i> {likes.length} Likes
              </div>
              <Link to={`/single-post/${_id}`}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                  Show More
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-8">
      {renderPostCards()}
    </div>
  );
};

export default PostCard;