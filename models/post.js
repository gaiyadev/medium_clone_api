const mongoose = require('mongoose');
require('../database/db');
const bcrypt = require('bcrypt');

const PostSchema = new mongoose.Schema({
    email: {
        type: String
    },
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    coverImage: {
        type: String,
        default: "no image",
    },
    like: {
        type: Number
    },
    share: {
        type: Number
    },
    comment: {
        type: Number
    },
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;

module.exports.newPost = (newPost, callback) => {
    newPost.save(callback); //create New User

}







