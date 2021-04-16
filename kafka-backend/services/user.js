/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* e
slint-disable no-console */
const bcrypt = require('bcrypt');
const User = require('../database/models/userModel');

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
      res.data = userres;
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

const login = async (msg, callback) => {
  const res = {};
  console.log('inside login service', msg.emailId);
  try {
    const userRes = await User.findOne({ emailId: msg.emailId }).exec();
    if (userRes === undefined && userRes === null) {
      console.log('user doesnot exist');
      res.data = 'user doesnot exist';
      res.status = 404;
      callback(null, res);
    }
    const userres = userRes;
    console.log('response 48', userres.password);
    console.log('msg password', msg.password);
    await bcrypt.compare(msg.password, userres.password, (
      err,
      isMatch,
    ) => {
      if (err) {
        console.log('err', err);
        callback(null, 'error');
      } else if (!isMatch) {
        res.status = 400;
        res.data = 'Wrong Password';
        callback(null, res);
      } else {
        console.log('Successful log in');
        console.log('user object', userres);
        res.status = 200;
        res.data = userres;
        callback(null, res);
      }
    });
  } catch (e) {
    console.log(e);
    res.status = 404;
    res.data = e;
    console.log('login failed!!');
    callback(null, 'error');
  }
};

const updateDetails = async (msg, callback) => {
  const res = {};
  console.log('user details service', msg);
  try {
    // eslint-disable-next-line max-len
    const userRes = await User.findOneAndUpdate({ emailId: msg.emailId }, msg, { new: true, useFindAndModify: true });
    if (userRes === undefined && userRes === null) {
      console.log('user doesnot exist');
      res.data = 'user doesnot exist';
      res.status = 404;
      callback(null, res);
    } else {
      res.data = userRes;
      res.status = 200;
      callback(null, res);
    }
  } catch (e) {
    res.status = 404;
    res.data = e;
    callback(null, 'error');
  }
};

const getAllUsersExceptCurrent = async (msg, callback) => {
  const res = {};
  console.log('inside getAllUsersExceptCurrent', msg);
  try {
    // eslint-disable-next-line max-len
    const userRes = await User.find({ emailId: { $ne: msg.emailId } }).select(['emailId']);
    if (userRes === undefined && userRes === null) {
      console.log('user doesnot exist');
      res.data = 'user doesnot exist';
      res.status = 404;
      callback(null, res);
    } else {
      res.data = userRes;
      res.status = 200;
      callback(null, res);
    }
  } catch (e) {
    res.status = 404;
    res.data = e;
    callback(null, 'error');
  }
};
function handleRequest(msg, callback) {
  if (msg.path === 'signup') {
    delete msg.path;
    signUp(msg, callback);
  } else if (msg.path === 'login') {
    delete msg.path;
    login(msg, callback);
  } else if (msg.path === 'updateDetails') {
    delete msg.path;
    updateDetails(msg, callback);
  } else if (msg.path === 'getAllUsersExceptCurrent') {
    delete msg.path;
    getAllUsersExceptCurrent(msg, callback);
  }
}

exports.handleRequest = handleRequest;
