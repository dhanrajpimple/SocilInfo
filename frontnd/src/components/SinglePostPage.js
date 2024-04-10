import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getsinglepost } from '../action/post';
import { like, unfollow, unlike, follow, comment } from '../action/user';
import chat from '../assets/chat.png';
import redheart from '../assets/red-heart.png';
import heart from '../assets/heart.png';

const SinglePostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [actionuser, setActionuser] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const store = localStorage.getItem('userId');
    if (storedToken) {
      setToken(storedToken);
      setUserId(store);
    }
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getsinglepost(id);
        if (response.data.success) {
          setPost(response.data.post);
          setActionuser(response.data.post.user._id);
        } else {
          console.error('Failed to fetch post:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id, token]);

  const handleLikeUnlike = async () => {
    try {
      if (post.likes.includes(userId)) {
        await unlike(id, userId); // Call API to unlike post
      } else {
        await like(id, userId); // Call API to like post
      }
      // Refetch the post after like/unlike to update the UI
      const response = await getsinglepost(id);
      if (response.data.success) {
        setPost(response.data.post);
        setActionuser(post.user._id);
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  const toggleCommentInput = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (commentText.trim()) {
        await comment(post._id, userId, commentText);
        setCommentText(''); // Clear the comment input after submitting
        // Refetch the post to update the comments
        const response = await getsinglepost(id);
        if (response.data.success) {
          setPost(response.data.post);
        }
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const followandunfollow = async () => {
    try {
      if (post.user.following.includes(userId)) {
        await unfollow(actionuser, userId); // Call API to unfollow user
      } else {
        await follow(actionuser, userId); // Call API to follow user
      }
      // Refetch the post after follow/unfollow to update the UI
      const response = await getsinglepost(id);
      if (response.data.success) {
        setPost(response.data.post);
      }
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
    }
  };

  if (!post) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const { user, title, image, description, likes, comments } = post;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mx-auto max-w-3xl">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div onClick={followandunfollow} className="cursor-pointer flex items-center">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-white mr-4">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{user.username}</h3>
            <span className="text-sm text-gray-500">{user.following.includes(userId) ? 'Following' : 'Follow'}</span>
          </div>
        </div>
        <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full items-center flex" onClick={handleLikeUnlike}>
          {likes.includes(userId) ? <img src={redheart} height={25} width={25} alt="Liked" /> : <img src={heart} height={25} width={25} alt="Like" />}
          <span className="ml-2">{likes.length} Likes</span>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <img src={image} alt={title} className="w-full h-64 object-cover mb-4" />
        <p className="mb-4">{description}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 mr-4"
              onClick={() => setShowComments(!showComments)}
            >
              {showComments ? 'Hide Comments' : 'Show Comments'}
            </button>
            <div onClick={toggleCommentInput} className="cursor-pointer">
              <img src={chat} alt="Chat" width="18" height="18" />
            </div>
          </div>
        </div>
        {/* Comment input field */}
        {showCommentInput && (
          <div className="mb-4">
            <form onSubmit={handleCommentSubmit} className="flex">
              <input
                type="text"
                value={commentText}
                onChange={handleCommentChange}
                placeholder="Write a comment..."
                className="px-4 py-2 border border-gray-300 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-lg transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        )}
        {/* Comments */}
        {showComments && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg mb-2 last:mb-0">
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePostPage;