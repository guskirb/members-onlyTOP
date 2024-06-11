const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');
const loginController = require('../controllers/loginController');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Members Only' });
});

router.get('/signup', signupController.signup_get);

router.post('/signup', signupController.signup_post);

router.get('/login', loginController.login_get);

module.exports = router;
