const Post = require('../models/Post');
const cloudinary = require("../cloudinary")
const upload = require("../multer")


exports.createPost = async (req, res) => {
  try {
    const { title, description, userId, category, tags } = req.body;
    
    // Check if title and description are provided
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required." });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    const image = result.secure_url;
    const cloudinary_id = result.public_id;
    const post = await Post.create({ title, description, image, user: userId,  cloudinary_id,tags,category });
    
    // Send the created post as a response

   return res.status(201).json({post,  success:true});
  } catch (error) {
    // If an error occurs, log it and send an error response
    console.error('Error creating post:', error);
   return  res.status(500).json({success:false, message: 'Error creating post' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username');
   return res.status(200).json({success: true , data:posts}) ;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return  res.status(500).json({ message: 'Error fetching posts', success:false });
  }
};

exports.getSinglePostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate({
      path: 'user',
      select: 'username followers following'
    }); 
    if (!post) {
      return res.status(404).json({ message: 'Post not found', success:false });
    }
    return res.status(200).json({ success:true, post });
  } catch (error) {
    console.error('Error fetching single post:', error);
    res.status(500).json({ message: 'Error fetching single post', success:false });
  }
}


exports.getPostByUserId = async(req, res)=>{
  try {
    const {userId} = req.body;
    const post = await  Post.find({user : userId});
    if(!post){
      return res.status(404).json({ message: 'Post not found', success:false});
    }
    return res.status(200).json({success:true, post});
  } catch (error) {
    console.error('Error fetching userpost post:', error);
    res.status(500).json({ message: 'Error fetching userpost post', success:false });
  }
};
exports.updatePost = async (req, res) => {
  try {
      const { postId, title, description, userId, category, tags } = req.body;
      let updatedPost = await Post.findById(postId);
      await cloudinary.uploader.destroy(updatedPost.cloudinary_id);

      let result;
      if (req.file) {
          result = await cloudinary.uploader.upload(req.file.path);
      }
      const image = result.secure_url;
      const cloudinary_id = result.public_id;

      updatedPost = await Post.findByIdAndUpdate(
          postId,
          {
              title,
              description,
              userId,
              category,
              tags,
              image,
              cloudinary_id
          },
          { new: true }
      );

      return res.status(201).json({ message: "Post updated successfully", updatedPost });
  } catch (error) {
      console.error('Error updating post:', error);
      return res.status(500).json({ message: 'Error updating post', success: false });
  }
}

exports.deletePost = async (req, res) => {
  try {
      const { postId } = req.params;
      const post = await Post.findById(postId);
      await cloudinary.uploader.destroy(post.cloudinary_id);
      await Post.findByIdAndDelete(postId);

      return res.status(201).json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
      console.error('Error deleting post:', error);
      return res.status(500).json({ message: 'Error deleting post', success: false });
  }
}


exports.getPostsByFollowedUser = async (req, res) => {
  try {
      const userId = req.body; 
      const currentUser = await User.findById(userId);
      if (!currentUser) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      const followingIds = currentUser.following;

      const posts = await Post.find({ user: { $in: followingIds } })
          .populate('user', 'username') 
          .sort({ createdAt: -1 }); 
      res.status(200).json({ success: true, posts });
  } catch (error) {
      console.error('Error fetching posts by followed users:', error);
      res.status(500).json({ success: false, message: 'Error fetching posts by followed users' });
  }
};
