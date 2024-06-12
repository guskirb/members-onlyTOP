const bcrypt = require('bcrypt');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.login_get = asyncHandler(async (req, res, next) => {
    res.render('log_in', {
        title: 'Log In',
        errors: undefined,
    });
});

exports.validateLogin = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Enter an email address')
        .custom(async value => {
            const user = await User.findOne({ email: value }).exec();
            if (!user) {
                return new Error('Email not found');
            }
        })
        .escape(),
    body('password', 'Password incorrect')
        .isLength({ min: 5 })
        .withMessage('Password must contain at least 5 characters')
        .custom(async (value, { req }) => {
            const user = await User.findOne({ email: req.body.email }).exec();
            if (!user) {
                throw new Error();
            } else {
                const match = await bcrypt.compare(value, user.password);
                if (!match) {
                    throw new Error('Password incorrect');
                }
            }
        })
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            res.render('log_in', {
                title: 'Log In',
                errors: errors.mapped(),
            });
            return;
        } else {
            next();
        }
    }),
];