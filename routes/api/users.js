const UserController = require('../../controllers/userController');
const auth = require('../../middleware/auth');
var express = require('express');
var router = express.Router();



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

/*  @route     DELETE api/users/id
    @desc      Delete In a user
    @access    Private
 */

router.delete('/:id', auth, UserController.delete_user);
/*  @route     POST api/users/id
    @desc      Update user password
    @access    Private
 */
router.patch('/:id', auth, UserController.change_user_password);
/*  @route     GET api/users/id
    @desc      Get a single user 
    @access    Private
 */
router.get('/:id', auth, UserController.get_user_by_id);

/*  @route     GET api/users/:email
    @desc      CHecking if user email already exits
    @access    Public
 */
router.get('/checkemail/:email', UserController.email_alreadyExist);
/*  @route     GET api/users/:username
    @desc      Checking if username already exits
    @access    Public
 */
router.get('/checkusername/:username', UserController.username_alreadyExist);


module.exports = router;
