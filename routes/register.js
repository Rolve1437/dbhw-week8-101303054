var express = require('express');
var router = express.Router();
var Member = require('../models/Member');

router.get('/', function(req, res, next) {
  res.render('register', {
    member : null
  });
});

router.post('/', function(req, res, next) {
  var newMember = new Member({
    name : req.body.name,
    account : req.body.account,
    password : req.body.password
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
