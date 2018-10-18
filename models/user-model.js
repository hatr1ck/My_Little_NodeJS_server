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
loginSchema.methods.isPasswordValid = function(rawPassword, callback) {
  bcrypt.compare(rawPassword, this.password, function(err, same) {
      
      if (err) {
          callback(err);
      }
      console.log(rawPassword, this.password)
      callback(null, same);
  });
};


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
module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}