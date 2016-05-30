var express = require('express');
var router = express.Router();
var Member = require('../models/Member');

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
      if(req.body.password = memberList.password){
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
