const Post = require('../models/post');
/**
 * 
 * @param {email} req 
 * @param {title}
 * @param {post} res 
 */
exports.add_new_post = (req, res) => {
    const email = req.user.email;
    const { title, body } = req.body;
    if (!title || !email || !body) {
        return res.status(400).json({
            error: 'Please all fields are required'
        });
    }
    const newPost = new Post({
        email: email,
        title: title,
        body: body,
    });
    Post.newPost(newPost, (err, post) => {
        if (err) return err;
        return res.json({
            message: "Post created successfully",
            post
        });
    });
}