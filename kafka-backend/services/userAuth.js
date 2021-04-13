/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* e
slint-disable no-console */
const User = require('../database/models/userModel');
// const bcrypt = require('bcrypt');

const signUp = async (msg, callback) => {
  const res = {};
  console.log('inside signup service', msg.emailId);
  const userExists = await User.findOne({ emailId: msg.emailId }).exec();
  console.log(userExists, 'userExists reply');
  if (userExists !== undefined && userExists !== null) {
    console.log('userexist');
    res.status = 404;
    res.body = 'userexist';
    callback(null, res);
  } else {
    const userres = await new User(msg);
    console.log(userres, 'usercreated');
    try {
      await userres.save();
      res.data = JSON.stringify(userres);
      res.status = 200;
      callback(null, res);
    } catch (e) {
      console.log(e);
      res.status = 500;
      console.log('signup failed!!');
      callback(null, 'error');
    }
  }
};

function handleRequest(msg, callback) {
  if (msg.path === 'signup') {
    delete msg.path;
    signUp(msg, callback);
  } else if (msg.path === 'user-login') {
    console.log(msg);
    // delete msg.path;
    // signUp(msg, callback);
  }
}

exports.handleRequest = handleRequest;
