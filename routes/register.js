var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var bcrypt = require('bcryptjs');

router.get('/', function(req, res, next) {
  res.render('register', {
    member : null
  });
});

router.post('/', function(req, res, next) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  var newMember = new Member({
    name : req.body.name,
    account : req.body.account,
    password : hash
  });

  newMember.save(function(err) {
    if(err) {
      next();
    }
    else {
      req.session.member = newMember;
      res.redirect('/');
    }
  });
});

router.get('/logout', function(req, res, next) {
  req.session.member = null;
  res.redirect('/');
});

module.exports = router;
