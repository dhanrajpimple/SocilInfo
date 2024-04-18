const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const config = require('../config');
require('dotenv').config();
const {sendWelcomeEmail} = require('../mainsend')

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  
  try {
      // Create the user
      const user = await User.create({ username, email, password: hashedPassword });
      
      if (!user) {
       
        return res.status(404).json({ message: 'create' });
      }
      // await sendWelcomeEmail(email, username);
      
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.secretKey); // Expires in 24 hours
      
      // Send response with token
      res.status(200).send({ auth: true, token, user });
  } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).send('Error registering user');
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      // Find the user by email in the database
      const user = await User.findOne({ email });
      if (!user) {
       
        return res.status(404).json({ message: 'No user found' });
      }
      const token = jwt.sign({ id: user._id }, process.env.secretKey, { expiresIn: '1h' });
      res.status(200).json({ auth: true, token, user });
    } catch (error) {
      // Internal server error
      console.error('Error on the server:', error);
      res.status(500).json({ message: 'Error on the server' });
    }
  };

  exports.deleteuser = async (req, res) =>{
    try {
      const {userId} = req.body;
      const  user = await User.findByIdAndRemove({_id: userId})
      if(!user){
        return res.status(400).json({success:false, message:"user not find"})
      }
      return res.status(201).json({success:true, data:user});
    } catch (error) {
      console.log(error);
      return res.status(501).json({success:false, message:"server error"})      
    }

  }

  exports.updateuser = async (req, res) => {
    try {
        const { userId, newData } = req.body; 
        const user = await User.findByIdAndUpdate(userId, newData, { new: true }); 
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "User updated successfully", user });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.body;
  
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user }); // Return user directly without wrapping in a success object
  } catch (error) {
    console.error("Error getting user:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};