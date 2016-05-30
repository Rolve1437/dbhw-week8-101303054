var express = require('express');
var router = express.Router();
var Article = require('../models/Article');
var Member = require('../models/Member');

router.get('/new', function(req, res, next) {
  if(!req.session.member){
    res.redirect('/');
  }
  else{
    res.render('post', {
      member : req.session.member
    });
  }
});

router.post('/', function(req, res) {
  if(!req.session.member) {
    res.redirect('/');
  }

  var newArticle = new Article({
    title : req.body.title,
    content : req.body.content,
    memberId : req.session.member.id
  });

  newArticle.save(function(err) {
    if(err) {
      next();
    }
    else {
      res.redirect("/");
    }
  });
});

router.get('/:articleId', function(req, res, next) {
  Article.get(req.params.articleId, function(err, article) {
    if(err) {
      next();
    }
    else {
      Member.get(article.memberId, function(err, member) {
        if(err) {
          next();
        }
        else {
          article.member = member;
          res.render('content', {
            article : article,
            member : req.session.member || null
          });
        }
      })
    }
  });
});

module.exports = router;
