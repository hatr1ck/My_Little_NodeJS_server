const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const loginSchema = new Schema({
    username: String,
    googleId: String,
    password: String,
    email: String,
    thumbnail: String
});
loginSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });

  const userSchema = new Schema({
    username: String,
    googleId: String,
    password: String,
    email: String,
    thumbnail: String
});
const item = new Schema({
    nickname: String
});
const User = mongoose.model('google', userSchema);
const Item = mongoose.model('items', item);
const Login = mongoose.model('logins', loginSchema);

module.exports.User = User;
module.exports.Login = Login;
module.exports.Item = Item;