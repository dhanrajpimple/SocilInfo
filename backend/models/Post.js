const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    cloudinary_id: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ text: String, postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
    category: { type: String }, 
    tags: [{ type: String }]
});

module.exports = mongoose.model('Post', postSchema);
