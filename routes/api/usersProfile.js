const auth = require('../../middleware/auth');
const ProfileController = require('../../controllers/profileController');
var express = require('express');
var router = express.Router();



/*  @route     POST api/users/profile/add
    @desc      Add new user profile
    @access    Private
 */

router.post('/add', auth, ProfileController.create_new_user_profile);

module.exports = router;
