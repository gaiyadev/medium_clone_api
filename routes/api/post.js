const auth = require('../../middleware/auth');
const PostController = require('../../controllers/postController');
var express = require('express');
var router = express.Router();



/*  @route     POST api/post/add
    @desc      Add up a user
    @access    Private
 */

router.post('/add', auth, PostController.add_new_post);


module.exports = router;
