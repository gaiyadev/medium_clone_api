var express = require('express');
var router = express.Router();
const UserController = require('../../controllers/userController');
const { post } = require('..');



/*  @route     POST api/users/register
    @desc      Sign up a user
    @access    Public
 */
router.post('/register', UserController.sign_up);

/*  @route     POST api/users/login
    @desc      Sign In a user
    @access    Public
 */
router.post('/login', UserController.sign_in);


module.exports = router;
