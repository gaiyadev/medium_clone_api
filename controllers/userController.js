const User = require('../models/user')
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

/*
 * *Sign in a new user
 * @param {*} req
 * @param {*} res
 */
exports.sign_in = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: 'Please all fields are required'
        });
    }

    User.findOne({ email: email }).then(user => {
        if (!user) return res.status(400).json({ error: 'email or password is invalid' });
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (!isMatch) {
                return res.status(400).json({ error: "Email or Password is invalid" });
            } else {
                // success login ... Generating jwt for auth
                jwt.sign({ _id: user._id, email: user.email, name: user.name },
                    config.get('MD_SECRET_KEY'),
                    {
                        expiresIn: 3600
                    }, (err, token) => {
                        if (err) throw err;
                        return res.json({
                            token,
                            user: {
                                _id: user._id,
                                email: user.email,
                                username: user.name,
                            },
                            message: "Sign in successfully"
                        });
                    });
            }
        })
    });
};



/*
 * *Sign up a new user
 * @param {email} req 
 * @param {password} req
 * @param {user} res 
 * 
 * 
 */
exports.sign_up = (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({
            error: 'Please all fields are required'
        });
    }

    if (username.length <= 3 || password.length <= 4) {
        return res.status(400).json({
            error: 'Please all fields muts be atleast more than 3 characters'
        });
    }
    User.findOne({ email: email }).then(user => {
        if (user) return res.status(400).json({ error: 'User already exist' });
        const newUser = new User({
            username: username,
            email: email,
            password: password,
        });

        User.newUser(newUser, (err, user) => {
            if (err) return err;
            return res.json({
                message: "Account created successfully",
                user
            });
        });
    }).catch(err => {
        console.log(err);
    });
};

/**
 * Delete user account
 * @param {*} req 
 * @param {*} res 
 */
exports.delete_user = (req, res) => {
    User.findById(req.params.id).then(id => id.remove().
        then(() => res.status(200).json({
            message: 'Account deleted successfully',
            id
        }))).
        catch(err => res.status(404).json({
            success: false,
            message: 'No user found',
            err: err
        }))
}



/**
 * Change user password
 * @param {*} req 
 * @param {*} res 
 */
exports.change_user_password = (req, res) => {
    const newPassword = req.body.password;
    User.findOne({ _id: req.params.id })
        .then(user => {
            if (!user) {
                return res.status(422).json({
                    error: "User doesn't exist"
                });
            }
            bcrypt.hash(newPassword, 10).then(hashPassword => {
                user.password = hashPassword;
                user.save().then(saveUser => {
                    return res.json({
                        message: "Password changed successfully",
                        saveUser,
                    });
                })
            });
        }).catch(err => console.log(err));
}

/**
 * Get a single user
 * @param {*} req 
 * @param {*} res 
 */

exports.get_user_by_id = (req, res) => {
    User.findOne({ _id: req.params.id }).then((user) => {
        return res.json({
            user: user,
        })
    }).catch(() => {
        return res.status(404).json({
            message: "No user found"
        });
    })
}

/**
 * Checking if email already exist
 * @param {*} req 
 * @param {*} res 
 */
exports.email_alreadyExist = (req, res) => {
    User.findOne({ email: req.params.email }).then((result) => {
        if (result) {
            return res.json({
                status: true,
                message: 'Email already taken',
            });
        } else {
            return res.json({
                status: false,
                message: 'Yeah... ',
            });
        }
    }).catch((err) => {
        console.log(err);
    });
}
/**
 * Checking if Username already exist
 * @param {*} req 
 * @param {*} res 
 */
exports.username_alreadyExist = (req, res) => {
    User.findOne({ username: req.params.username }).then((result) => {
        if (result) {
            return res.json({
                status: true,
                message: 'Username already taken',
            });
        } else {
            return res.json({
                status: false,
                message: 'Yeah...',
            });
        }
    }).catch((err) => {
        console.log(err);
    });
}