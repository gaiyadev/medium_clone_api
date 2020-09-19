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
    // const { name, profession, dob, title, about } = req.body;
    let profile = {};
    await UserProfile.findOne({ email: req.user.email }, (err, result) => {
        if (err) {
            profile = {};
        }
        if (result != null) {
            profile = result;
        }
    });
    await UserProfile.findOneAndUpdate(
        { email: req.user.email },
        {
            $set: {
                name: req.body.name ? req.body.name : profile.name,
                profession: req.body.profession
                    ? req.body.profession
                    : profile.profession,
                dob: req.body.dob ? req.body.dob : profile.dob,
                title: req.body.title ? req.body.title : profile.title,
                about: req.body.about ? req.body.about : profile.about, //about:""
            },
        },
        { new: true },
        (err, result) => {
            if (err) return res.json({ err: err });
            if (!result) return res.json({ data: [] });
            else return res.json({ data: result });
        }
    );

}


/**
 * Getting user profily
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.get_user_profile_data = async (req, res) => {
    await UserProfile.findOne({ email: req.user.email }, (err, result) => {
        if (err) return res.json({ err: err });
        if (!result) return res.json({ data: [] });
        else return res.json({ data: result });
    });
}