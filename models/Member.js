var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Member = function(options) {
  this.id = options.id;
  this.name = options.name;
  this.account = options.account;
  this.password = options.password;
};

Member.get = function(memberId, cb) {
  db.select()
    .from('member')
    .where({id : memberId})
    .map(function(row) {
      //將select出來的資料轉換成Member物件
      return new Member(row);
    })
    .then(function(memberList) {
      if(memberList.length) {
        cb(null, memberList[0]);
      }
      else {
        cb(new GeneralErrors.NotFound());
      }
    })
    .catch(function(err) {
      cb(new GeneralErrors.Database());
    })
}

Member.getByAccount = function(memberAccount, cb) {
  db.select()
    .from('member')
    .where({account : memberAccount})
    .map(function(row) {
      //將select出來的資料轉換成Member物件
      return new Member(row);
    })
    .then(function(memberList) {
      if(memberList.length) {
        cb(null, memberList[0]);
      }
      else {
        cb(new GeneralErrors.NotFound());
      }
    })
    .catch(function(err) {
      cb(new GeneralErrors.Database());
    })
}

Member.prototype.save = function (cb) {
  if (this.id) {
    db("member")
      .where({id : this.id})
      .update({
        name : this.name,
        account : this.account,
        password : this.password
      })
      .then(function() {
        cb(null, this);
      }.bind(this))
      .catch(function(err) {
        cb(new GeneralErrors.Database());
      });
  }
  else {
    db("member")
      .insert({
        name: this.name,
        account: this.account,
        password: this.password
      })
      .then(function(result) {            //設定this.id
        var insertedId = result[0];
        this.id = insertedId;
        cb(null, this);
      }.bind(this))
      .catch(function(err) {
        cb(new GeneralErrors.Database());
      });
  }
};

module.exports = Member;
