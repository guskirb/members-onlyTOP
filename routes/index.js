const express = require('express');
const router = express.Router();
const passport = require('passport');
const signupController = require('../controllers/signupController');
const loginController = require('../controllers/loginController');

/* GET home page. */
router.get('/', (req, res, next) => {

  res.render('index', {
    title: 'Members Only',
  });
});

router.get('/signup', signupController.signup_get);

router.post('/signup', signupController.signup_post);

router.get('/login', loginController.login_get);

router.post('/login', passport.authenticate('local', {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}));

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
