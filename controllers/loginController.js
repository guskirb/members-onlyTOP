const bcrypt = require('bcrypt');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.login_get = asyncHandler(async (req, res, next) => {
    res.render('log_in', { title: 'Log In' });
});