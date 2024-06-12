const User = require('../models/user');
const Message = require('../models/message');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.index_get = asyncHandler(async (req, res, next) => {
    res.render('index', {
        title: 'Members Only',
        errors: undefined,
    });
});

exports.index_post = [
    body('message')
        .isLength({ min: 1 })
        .withMessage('Enter a message')
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const message = new Message({
            message: req.body.message,
            user: req.user._id,
            date: new Date(),
        });

        if (!errors.isEmpty()) {
            res.render('index', {
                title: 'Members Only',
                errors: errors.mapped(),
            });
            return;
        } else {
            await message.save();
            res.redirect('/');
        }
    }),
];