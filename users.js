/*var express = require('express');
var router = express.Router();*/
var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs');
var userSchema = new mongoose.Schema({
  local: {
    email : String,
    password : String
  },
  facebook: {
    email : String,
    password : String,
    id: String,
    token: String
  },
  twitter: {
    email : String,
    password : String,
    id: String,
    token: String
  },
  google: {
    email : String,
    password : String,
    id: String,
    token: String
  },
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validatePassword = function (password){
  return bcrypt.compareSync(password, this.local.password);
}
module.exports = mongoose.model('User', userSchema);
/* GET users listing.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/', function(req, res, next) {
  conect mongo

  res.send({name: "Harry Potter"});
});

module.exports = router;*/
