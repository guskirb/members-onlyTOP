if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const router = express.Router();
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const indexController = require('../controllers/indexController');
const signupController = require('../controllers/signupController');
const loginController = require('../controllers/loginController');
const authMiddleware = require('../authMiddleware');
const User = require('../models/user');
const Message = require('../models/message');

/* GET home page. */
router.get('/', indexController.index_get);

router.post('/', indexController.index_post);

router.get('/signup', authMiddleware.isLoggedIn, signupController.signup_get);

router.post('/signup', signupController.signup_post);

router.get('/login', authMiddleware.isLoggedIn, loginController.login_get);

router.post('/login', loginController.validateLogin, passport.authenticate('local', {
  successRedirect: "/",
  failureRedirect: "/login",
}));

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

router.get('/admin', authMiddleware.isAuth, (req, res, next) => {
  res.render('admin', {
    title: 'Admin Password',
    error: undefined,
  });
});

router.post('/admin', async (req, res, next) => {
  if (req.body.password === process.env.password) {
    const user = await User.findOne(req.user._id);
    user.admin = true;
    await User.findByIdAndUpdate(req.user._id, user, {});
    res.redirect('/');
  } else {
    res.render('admin', {
      title: 'Admin Password',
      error: 'Incorrect password',
    });
  }
});

router.post('/delete', authMiddleware.isAdmin, asyncHandler(async (req, res, next) => {
  await Message.findByIdAndDelete(req.body.id);
  res.redirect('/');
}));

module.exports = router;
