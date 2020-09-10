const UserProfile = require("../models/userProfile");


exports.create_new_user_profile = async (req, res) => {
    const email = req.user.email;
    const { name, profession, dob, title, about } = req.body;

    if (!email || !name || !profession || !dob || !title || !about) {
        return res.status(400).json({
            error: 'Please all fields are required'
        });
    } else {
        const newUserProfile = new UserProfile({
            email: email,
            name: name,
            profession: profession,
            dob: dob,
            title: title,
            about: about,
        });
        await UserProfile.newUserProfile(newUserProfile, (err, newUserProfile) => {
            if (err) return err;
            return res.json({
                message: "Profile created successfully",
                newUserProfile
            });
        });
    }
}