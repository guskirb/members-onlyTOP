const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members Only' });
});

router.get('/signup', function(req, res, next) {
  res.render('sign_up', { title: 'Sign Up' });
});


router.get('/login', function(req, res, next) {
  res.render('log_in', { title: 'Log In' });
});

module.exports = router;
