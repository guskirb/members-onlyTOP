const bcrypt = require('bcrypt');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.signup_get = asyncHandler(async (req, res, next) => {
    res.render('sign_up', {
        title: 'Sign Up',
        errors: undefined,
    });
});

exports.signup_post = [
    body('first_name')
        .trim()
        .isLength({ min: 1 })
        .withMessage('First name is required'),
    body('last_name')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Last name is required'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Not a valid email address')
        .custom(async value => {
            const user = await User.findOne({ email: value }).exec();
            if (user) {
                throw new Error('Email already in use');
            }
        }),
    body('password')
        .isLength({ min: 5 })
        .withMessage('Password must contain at least 5 characters'),
    body('confirmPassword').custom((value, { req }) => {
        return value === req.body.password;
    }).withMessage('Passwords do not match'),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('sign_up', {
                title: 'Sign Up',
                errors: errors.array(),
            });
        }

        try {
            const hashedPass = await bcrypt.hash(req.body.password, 10);
            const user = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hashedPass,
                admin: false,
            });
        } catch (err) {

        }
    }),
];