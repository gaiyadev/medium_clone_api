const auth = require('../../middleware/auth');
const ProfileController = require('../../controllers/profileController');
const multer = require('multer');
const UserProfile = require("../../models/userProfile");
const path = require('path');
var express = require('express');
var router = express.Router();


// To handle file uploads
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 150000000
    },
    fileFilter: (req, file, cb) => {
        // allow images only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            console.log('Only image are allowed.');
        }
        cb(null, true);
    },
});



/*  @route     POST api/users/profile/add
    @desc      Add new user profile
    @access    Private
 */

router.post('/add', auth, ProfileController.create_new_user_profile);

/*  @route     POST api/users/profile/add/image
    @desc      Add new user profile image
    @access    Private
 */
router.patch('/add/image', auth, upload.single('profile_image'), async (req, res) => {
    await UserProfile.findOneAndUpdate(
        { email: req.user.email },
        {
            $set: {
                profile_image: req.file.path,
            }
        }, { new: true },
        (err, profileImage) => {
            if (err) return res.status(500).json({ err });
            return res.json({
                message: "image added successfully",
                data: profileImage,

            });
        }
    );
});

/*  @route     PATCH api/users/profile/update
    @desc      Update user profile
    @access    Private
 */

router.patch('/update', auth, ProfileController.update_user_profile);

/*  @route     GET api/users/profile/getData
    @desc      Get user profile
    @access    Private
 */

router.get('/getData', auth, ProfileController.get_user_profile_data);


module.exports = router;
