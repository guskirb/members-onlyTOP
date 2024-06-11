const express = require('express');
const router = express.Router();
const passport = require('passport');
const signupController = require('../controllers/signupController');
const loginController = require('../controllers/loginController');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Members Only' });
});

router.get('/signup', signupController.signup_get);

router.post('/signup', signupController.signup_post);

router.get('/login', loginController.login_get);

router.post('/login', passport.authenticate('local', {
  successRedirect: "/",
  failureRedirect: "/login"
}),
  loginController.login_post);

module.exports = router;
