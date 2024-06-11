const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('sign_up', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
  res.render('log_in', { title: 'Express' });
});

module.exports = router;
