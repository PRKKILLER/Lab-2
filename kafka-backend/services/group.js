/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const group = require('../database/models/groupModel');
const { getDuesForGroup } = require('../database/controller/userConnectionsController');

const creategroup = async (msg, callback) => {
  const res = {};
  msg.users.push({ emailId: msg.creatorId });
  console.log('inside create grp service', msg.emailId);
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
    console.log('create group error');
    callback(null, 'error');
  }
};
const grouppicture = async (msg, callback) => {
  const res = {};
  console.log('inside group picture', msg);
  // eslint-disable-next-line new-cap
  try {
    // eslint-disable-next-line max-len
    const Res = await group.findOneAndUpdate({ _id: msg.groupId }, { URL: msg.URL }, { new: true, useFindAndModify: true });
    if (Res === undefined && Res === null) {
      res.status = 404;
      callback(null, res);
    } else {
      await Res.save();
      res.data = Res;
      res.status = 200;
      callback(null, res);
    }
  } catch (e) {
    res.status = 404;
    res.data = e;
    console.log('group picture error');
    callback(null, 'error');
  }
};

const groupslist = async (msg, callback) => {
  const res = {};
  console.log('inside group list', msg);
  // eslint-disable-next-line new-cap
  try {
    // eslint-disable-next-line max-len
    const Res = await group.find().where('users.emailId').equals(msg.emailId);
    if (Res === undefined && Res === null) {
      console.log('group doesnot exist');
      res.data = 'group doesnot exist';
      res.status = 404;
      callback(null, res);
    } else {
      console.log('data', Res);
      res.data = Res;
      res.status = 200;
      callback(null, res);
    }
  } catch (e) {
    res.status = 404;
    res.data = e;
    console.log('grouplist erroe');
    callback(null, 'error');
  }
};

const acceptinvitation = async (msg, callback) => {
  const res = {};
  console.log('inside accept invitation', msg);
  // eslint-disable-next-line new-cap
  try {
    // eslint-disable-next-line max-len
    const Res = await group.findById(msg.groupId).select({ users: 1 });
    console.log('query res', Res);
    // const newRes = Res.findOneAndUpdate({users:{emailId:msg.emailId }}, {});
    if (Res === undefined && Res === null) {
      console.log('group doesnot exist');
      res.data = 'group doesnot exist';
      res.status = 404;
      callback(null, res);
    } else {
      for (let i = 0; i < Res.users.length; i += 1) {
        if (Res.users[i].emailId === msg.emailId) {
          Res.users[i].flag = true;
        }
      }
      await Res.save();
      console.log('data', Res);
      res.data = Res;
      res.status = 200;
      callback(null, res);
    }
  } catch (e) {
    res.status = 404;
    res.data = e;
    console.log(e);
    console.log('grouplist error');
    callback(null, 'error');
  }
};

const leavegroup = async (msg, callback) => {
  const res = {};
  console.log('inside leave group', msg);
  // eslint-disable-next-line new-cap
  try {
    // eslint-disable-next-line max-len
    const getDuesRes = await getDuesForGroup(msg.groupId, msg.emailId);
    console.log('query res', getDuesRes);
    if (getDuesRes.status === 200) {
      console.log('Dues pending cannot leave');
      res.data = 'Dues pending cannot leave';
      res.status = 500;
      callback(null, res);
    } else {
      const Res = await group.findById(msg.groupId);
      for (let i = 0; i < Res.users.length; i += 1) {
        if (Res.users[i].emailId === msg.emailId) {
          Res.users.splice(i, 1);
        }
      }
      await Res.save();
      res.data = Res;
      res.status = 200;
      callback(null, res);
    }
  } catch (e) {
    res.status = 404;
    res.data = e;
    console.log(e);
    console.log('grouplist error');
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
  } else if (msg.path === 'groupslist') {
    delete msg.path;
    groupslist(msg, callback);
  } else if (msg.path === 'acceptinvitation') {
    delete msg.path;
    acceptinvitation(msg, callback);
  } else if (msg.path === 'leavegroup') {
    delete msg.path;
    leavegroup(msg, callback);
  }
}

exports.handleRequest = handleRequest;
