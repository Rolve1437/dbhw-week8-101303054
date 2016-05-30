var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var bcrypt = require('bcryptjs');

router.get('/', function(req, res, next) {
  res.render('login', {
    member : null
  });
});

router.post('/', function(req, res, next) {
  Member.getByAccount(req.body.account,function(err, memberList) {
    if(err) {
      res.render('loginError', {
        member : null
      });
    }
    else {
      if(bcrypt.compareSync(req.body.password,memberList.password)){
        req.session.member = memberList;
        res.redirect('/');
      }
      else{
        res.render('loginError', {
          member : null
        });
      }
    }
  });
});

module.exports = router;
