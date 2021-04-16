/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const group = require('../database/models/groupModel');

const creategroup = async (msg, callback) => {
  const res = {};
  console.log('inside signup service', msg.emailId);
  // eslint-disable-next-line new-cap
  const userres = new group(msg);
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
};
const grouppicture = async (msg, callback) => {
  const res = {};
  console.log('inside group service', msg);
  // eslint-disable-next-line new-cap
  try {
    // eslint-disable-next-line max-len
    const Res = await group.findOneAndUpdate({ _id: msg.groupId }, { URL: msg.URL }, { new: true, useFindAndModify: true });
    if (Res === undefined && Res === null) {
      console.log('group doesnot exist');
      res.data = 'user doesnot exist';
      res.status = 404;
      callback(null, res);
    } else {
      res.data = Res;
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
  if (msg.path === 'creategroup') {
    delete msg.path;
    creategroup(msg, callback);
  } else if (msg.path === 'grouppicture') {
    delete msg.path;
    grouppicture(msg, callback);
  }
  // }else if (msg.path === 'getAllUsersExceptCurrent') {
  //   delete msg.path;
  //   getAllUsersExceptCurrent(msg, callback);
  // } else if (msg.path === 'updateDetails') {
  //   delete msg.path;
  //   updateDetails(msg, callback);
  // }
}

exports.handleRequest = handleRequest;
