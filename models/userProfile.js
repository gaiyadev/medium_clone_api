const mongoose = require('mongoose');
require('../database/db');

const ProfileSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    profile_image: {
        type: String,
        default: 'image.jpg',
    },

    timestamps: true,

});

const UserProfile = mongoose.model('UserProfile', ProfileSchema);
module.exports = UserProfile;

module.exports.newUserProfile = (newUserProfile, callback) => {
    newUserProfile.save(callback); //create New UserProfile

}


