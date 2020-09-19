const UserProfile = require("../models/userProfile");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./upload");
//     },
//     filename: (req, file) => {
//         cb(null, req.user.username + ".jpg");
//     }
// })
// const upload = multer({
//     storage: storage
// });

/**
 * Add new user profile
 * @param {*} req 
 * @param {*} res 
 */


/**END OF FUNCTION TO HANDLE FILE UPLOAD */
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

/**
 * Update users profile
 * @param {*} req 
 * @param {*} res 
 */
exports.update_user_profile = async (req, res) => {
    const email = req.user.email;

    const { name, profession, dob, title, about } = req.body;
    if (!email || !name || !profession || !dob || !title || !about) {
        return res.status(400).json({
            error: 'Please all fields are required'
        });
    } else {
        UserProfile.findByIdAndUpdate(req.user._id, {
            name: name,
            email: email,
            profession: profession,
            dob: dob,
            title: title,
            about: about
        },
            (err, user) => {
                if (err) return res.status(404).json({ message: err });

                if (!user) return res.status(404).json({ message: 'User not found' });

                return res.json({
                    message: "Profile updated successfully",
                    user: user,
                });

            });
        // await UserProfile.updateOne({ _id: req.user._id }, {
        //     name: name,
        //     email: email,
        //     profession: profession,
        //     dob: dob,
        //     title: title,
        //     about: about
        // }, (err, user) => {
        //     if (err) throw err;
        //     if (!user) return res.status(404).json({ message: 'User not found' });
        //     return res.json({
        //         message: "Profile updated successfully",
        //         user: user,
        //     });
        // });
    }

}


/**
 * Getting user profily
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.get_user_profile_data = async (req, res) => {
    await UserProfile.findOne({ _id: req.user._id }, (err, user) => {
        if (err) return res.status(404).json({ err: err });
        if (user == null) return res.status(404).json({ message: 'User not found' });
        return res.json({ user: user });
    });
}