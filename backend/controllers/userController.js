const User = require('../models/User');
const Post = require('../models/Post');

exports.followUser = async (req, res) => {
    try {
        const {actionuser, userId} = req.body;
        console.log(actionuser, userId); 
        if (!userId || !actionuser) {
            return res.status(400).json({success:false, message:"user not find"});
        }
        const user = await User.findByIdAndUpdate(actionuser, { $addToSet: { following: userId } }, { new: true });
        return  res.status(200).json({success:true, user});
    } catch (error) {
        console.error('Error following user:', error);
        return   res.status(500).json({success:false, message:"server error"});
    }
};

exports.unfollowUser = async (req, res) => {
    try {
        const { actionuser, userId } = req.body; // Extract userIdToUnfollow and userId from req.body
        if (!userId || !actionuser) {
            return res.status(400).json({success:false, message:"error to unfollow"});
        }
        const user = await User.findByIdAndUpdate(actionuser, { $pull: { following: userId } }, { new: true });
        return res.status(200).json({success:true, message:"done"});
    } catch (error) {
        console.error('Error unfollowing user:', error);
        return  res.status(500).json({success:false, message:"server error"});
    }
};



exports.likePost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const {userId} = req.body;
      
      const post = await Post.findByIdAndUpdate(
        postId,
        { $addToSet: { likes: userId } },
        { new: true }
      );
  
      res.status(200).send({post, success:true, userId});
    } catch (error) {
      console.error('Error liking post:', error);
      res.status(500).send('Error liking post');
    }
  };

  exports.unlikePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { userId } = req.body;

        const post = await Post.findByIdAndUpdate(
            postId,
            { $pull: { likes: userId } },
            { new: true }
        );
 
        return  res.status(200).json({ post, success: true, userId });
    } catch (error) {
        console.error('Error unliking post:', error);
       return res.status(500).json({success:false, message:'server error'});
    }
};

  exports.getPostLikes = async (req, res) => {
    try {
      const postId = req.params.postId;
      
      // Find the post by ID and retrieve its likes array
      const post = await Post.findById(postId);
      
      // If the post doesn't exist or doesn't have likes, return an empty array
      if (!post || !post.likes) {
        return res.status(404).json({ success: false, message: 'Post not found or no likes' });
      }
  
      // Return the likes array
      res.status(200).json({ success: true, likes: post.likes });
    } catch (error) {
      console.error('Error getting post likes:', error);
      res.status(500).json({ success: false, message: 'Error getting post likes' });
    }
  };
  
  exports.commentPost = async (req, res) => {
    const postId = req.params.id;
    const { text, userId } = req.body;
  
    // Check if user ID is available
    if (!userId) {
      return res.status(401).json({success:false, message:"user not found"})
    }
  
    try {
      // Update the post with the new comment
      const post = await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: { text, postedBy: userId } } },
        { new: true }
      );
  
      if (!post) {
        return res.status(404).json({success:false, message:"post not found"})
      }
  
      return res.status(200).json({success:true, message:"successully change"})
    } catch (error) {
      console.error('Error commenting on post:', error);
       return res.status(500).json({success:false, message:"serve error"})
    }
  };
  
  exports.getAllCommentsForPost = async (req, res) => {
    const postId = req.params.postId;

    try {
        // Find the post by its ID and populate the comments field to get all comments
        const post = await Post.findById(postId).populate('comments.postedBy', 'username');

        if (!post) {
            return res.status(404).json({ message: "Post not found", success: false });
        }

        // Extract and send only the comments data
        const comments = post.comments.map(comment => ({
            text: comment.text,
            postedBy: comment.postedBy.username // Assuming user has a username field
        }));

         return res.status(200).json({success:true,comments});
    } catch (error) {
        console.error('Error fetching post comments:', error);
        res.status(500).json({ message: 'Error getting all comments', success: false });
    }
};


  exports.updateComment = async (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const { text, userId } = req.body;

    // Check if user ID is available
    if (!userId) {
        return res.status(401).json({success:false, message:"userId is not  provided"})
    }

    try {
        // Find the post and update the specified comment
        const post = await Post.findOneAndUpdate(
            { _id: postId, 'comments._id': commentId, 'comments.postedBy': userId },
            { $set: { 'comments.$.text': text } },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({success:false, message:"post is not  provided"})
        }

        return res.status(200).json({success:true, message:"success"});
    } catch (error) {
        console.error('Error updating comment:', error);
          return res.status(500).json({success:false, message:"server is not working"})
    }
};

exports.deleteComment = async (req, res) => {
    const postId = req.params.postId;
    const {userId, commentId} = req.body;

    // Check if user ID is available
    if (!userId) {
        return res.status(401).json({success:false, message:"userId is not  provided"})
    }

    try {
        // Find the post and remove the specified comment
        const post = await Post.findOneAndUpdate(
            { _id: postId, 'comments._id': commentId, 'comments.postedBy': userId },
            { $pull: { comments: { _id: commentId } } },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({success:false, message:"post is not  provided"})
        }

      return  res.status(200).json({success:true, message:"successfull", post})
    } catch (error) {
        console.error('Error deleting comment:', error);
       return res.status(500).json({success:false, message:"server erroe"})
    }
};



exports.getAllCommentsForPost = (req, res) => {
  const postId = req.params.postId;

  // Find the post by its ID and populate the comments field to get all comments
  Post.findById(postId)
    .populate('comments.postedBy', 'username') // Populate the user who posted the comment
    .exec((err, post) => {
      if (err) {
        console.error('Error fetching post comments:', err);
        return res.status(500).json({message:'Error fetching post comments', success:false});
      }
      if (!post) {
        return res.status(404).json({message:'Error fetching post comments', success:false});
      }
      
      // Extract and send only the comments data
      const comments = post.comments.map(comment => ({
        text: comment.text,
        postedBy: comment.postedBy.username // Assuming user has a username field
      }));

     return res.status(200).json({message:'successfull', post,success:true});
    });
};
   

