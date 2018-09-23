
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mySchema = new Schema({
    nickname: String
  });
let loginSchema = new Schema({
    login: String,
    email: String,
    password: String,
    googleID: Number
  });

    let Model = mongoose.model('Model', mySchema);
	let Login = mongoose.model('Login', loginSchema);

  module.exports.Model = Model;
  module.exports.Login = Login;