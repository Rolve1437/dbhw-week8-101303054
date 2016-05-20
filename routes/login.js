var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    member : null
  });
});

router.post('/', function(req, res, next) {
  var inputaccount = req.body.account;
  var inputpassword = req.body.password;
  newMember.getbyaccount(inputaccount.inputpassword,function(err,member) {
    if(err || inputpassword != memeber.password) {
      res.render('loginfail',{
        memeber : null
      });
    } else {
      req.session.member = member;
      res.redirect('/');
    }
  });
});

router.post('/logout', function(req, res, next) {
  req.session.member = null;
  res.redirect('/');
});


module.exports = router;
