var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Article = function(options) {
  this.id = options.id;
  this.title = options.title;
  this.content = options.content;
  this.memberId = options.memberId;
  this.createdAt = options.createdAt;
};

Article.getAll = function(cb) {
  db.select()
    .from('article')
    .map(function(row) {
      return new Article({
        id : row.id,
        title : row.title,
        content : row.content,
        memberId : row.member_id,
        createdAt : row.createdAt
      });
    })
    .then(function(articleList) {
      cb(null, articleList);
    })
    .catch(function(err) {
      cb(new GeneralErrors.Database());
    });
}

Article.get = function(articleId, cb) {
  db.select()
    .from('article')
    .where({id : articleId})
    .map(function(row) {
      return new Article({
        id : row.id,
        title : row.title,
        content : row.content,
        memberId : row.member_id,
        createdAt : row.createdAt
      });
    })
    .then(function(articleList) {
      if(articleList.length) {
        cb(null, articleList[0]);
      }
      else {
        cb(new GeneralErrors.NotFound());
      }
    })
    .catch(function(err) {
      cb(new GeneralErrors.Database());
    });
}

Article.prototype.save = function (cb) {
  if (this.id) {
    db('article')
      .where({id : this.id})
      .update({
        title : this.title,
        content : this.content
      })
      .then(function() {
        cb(null);
      })
      .catch(function(err) {
        cb(new GeneralErrors.Database());
      })
  }
  else {
    db('article')
      .insert({
        title : this.title,
        content : this.content,
        member_id : this.memberId
      })
      .then(function(result) {
        this.id = result[0];
        cb(null, this);
      }.bind(this))
      .catch(function(err) {
        cb(new GeneralErrors.Database());
      });
  }
};

module.exports = Article;
