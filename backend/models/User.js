const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true }, // Added 'required: true' to make the username mandatory
    email: { type: String, unique: true, required: true }, // Added 'required: true' to make the email mandatory
    password: { type: String, required: true }, // Added 'required: true' to make the password mandatory
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('User', userSchema);
