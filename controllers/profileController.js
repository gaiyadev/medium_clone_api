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