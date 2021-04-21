/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const {
  getgroupSummary, settleUpUsers, getUserOwed, getUserOwes,
} = require('../database/controller/userConnectionsController');

const groupSummary = async (msg, callback) => {
  const res = {};
  console.log('data inside groupSummary', msg);
  const { groupId } = msg;
  try {
    const summaryres = await getgroupSummary(groupId);
    console.log(summaryres);
    if (summaryres.status === 200) {
      console.log(summaryres);
      res.status = 200;
      res.data = summaryres;
      callback(null, res);
    } else if (summaryres.status === 500) {
      res.status = 500;
      res.data = summaryres.body;
      callback(null, res);
    }
  } catch (e) {
    res.status = 404;
    res.data = e;
    console.log(e);
    console.log('show summary error');
    callback(null, 'error');
  }
};
const settleUp = async (msg, callback) => {
  const res = {};
  console.log('data inside settleUp', msg);
  const { userthatowes, userthatowns } = msg;
  try {
    const settleupres = await settleUpUsers(userthatowns, userthatowes);
    console.log(settleupres);
    if (settleupres.status === 200) {
      console.log(settleupres);
      res.status = 200;
      res.data = settleupres.body;
      callback(null, res);
    } else if (settleupres.status === 500) {
      res.status = 500;
      res.data = settleupres.body;
      callback(null, res);
    }
  } catch (e) {
    res.status = 404;
    res.data = e;
    console.log(e);
    console.log('settleup error');
    callback(null, 'error');
  }
};

const userOwes = async (msg, callback) => {
  const res = {};
  console.log('data inside getUserOwes', msg);
  const { emailId } = msg;
  try {
    const getUserOwesres = await getUserOwes(emailId);
    console.log(getUserOwesres);
    if (getUserOwesres.status === 200) {
      console.log(getUserOwesres);
      res.status = 200;
      res.data = getUserOwesres;
      callback(null, res);
    } else if (getUserOwesres.status === 500) {
      res.status = 500;
      res.data = getUserOwesres;
      callback(null, res);
    }
  } catch (e) {
    res.status = 404;
    res.data = e;
    console.log(e);
    console.log('show getUserOwes error');
    callback(null, 'error');
  }
};

const userOwed = async (msg, callback) => {
  const res = {};
  console.log('data inside getUserOwed', msg);
  const { emailId } = msg;
  try {
    const getUserOwedRes = await getUserOwed(emailId);
    console.log(getUserOwedRes);
    if (getUserOwedRes.status === 200) {
      console.log(getUserOwedRes);
      res.status = 200;
      res.data = getUserOwedRes;
      callback(null, res);
    } else if (getUserOwedRes.status === 500) {
      res.status = 500;
      res.data = getUserOwedRes;
      callback(null, res);
    }
  } catch (e) {
    res.status = 404;
    res.data = e;
    console.log(e);
    console.log('show getUserOwedRes error');
    callback(null, 'error');
  }
};

function handleRequest(msg, callback) {
  if (msg.path === 'groupSummary') {
    delete msg.path;
    groupSummary(msg, callback);
  } else if (msg.path === 'settleUp') {
    delete msg.path;
    settleUp(msg, callback);
  } else if (msg.path === 'userOwed') {
    delete msg.path;
    userOwed(msg, callback);
  } else if (msg.path === 'userOwes') {
    delete msg.path;
    userOwes(msg, callback);
  }
}

exports.handleRequest = handleRequest;
