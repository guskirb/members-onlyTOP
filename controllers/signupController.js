const bcrypt = require('bcrypt');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.signup_get = asyncHandler(async (req, res, next) => {
    res.render('sign_up', { title: 'Sign Up' });
});

exports.signup_post = asyncHandler(async (req, res, next) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPass,
            admin: false,
        });
        console.log(user);
    } catch (err) {

    }
});