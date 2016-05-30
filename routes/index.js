var express = require('express');
var router = express.Router();
var Article = require('../models/Article');
var Member = require('../models/Member');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
  Article.getAll(function(err, articleList) {
    if(err) {
      next();
    }
    else {
      //async.each(array, iterator, callback);
      async.each(articleList, function(article, cb) {
        Member.get(article.memberId, function(err, member) { //透過article.memberId找到member
          if(err) {
            cb(err);
          }
          else {
            article.member = member; //將member存進article中做為Attribute
            cb(null);
          }
        });
      }, function(err){ //callback
        if(err) {
          next();
        } else {
          res.render('index',
          {
            member : req.session.member || null,
            articleList: articleList
          });
        }
      });
    }
  });
});

module.exports = router;
