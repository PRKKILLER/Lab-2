/* eslint-disable max-len */
/* eslint-disable no-console */
const userconnections = require('../models/userconnectionsModel');
const { getGroupUsersWithoutCurrent } = require('./groupController');

const getDuesForGroup = async (groupId, emailId) => {
  try {
    console.log('inside getDuesForGroup userid', emailId);
    console.log('inside getDuesForGroup groupId', groupId);
    const duesObject = await userconnections.find({
      groupId,
      userthatowes: emailId,
      owes: { $ne: 0 },
    });
    if (duesObject !== undefined && duesObject !== null && duesObject !== []) {
      return ({
        status: 200,
        body: duesObject,
      });
    }
    return ({
      status: 404,
      body: 'No such dues exists',
    });
  } catch (err) {
    console.log('err', err);
    return ({
      statusCode: 500,
      body: err,
    });
  }
};
const getgroupSummary = async (groupId) => {
  try {
    console.log('inside getgroupSummary groupId', groupId);
    const summaryObject = await userconnections.find({
      groupId,
    });
    if (summaryObject !== undefined && summaryObject !== null && summaryObject.length !== 0) {
      return ({
        status: 200,
        body: summaryObject,
      });
    }
    return ({
      status: 500,
      body: 'No dues exists for the group',
    });
  } catch (err) {
    console.log('getgroupSummary error', err);
    return ({
      statusCode: 500,
      body: err,
    });
  }
};

const settleUpUsers = async (userthatowns, userthatowes) => {
  try {
    console.log('inside settleUpUsers groupId', userthatowns, userthatowes);
    const settleUpUsersObject = await userconnections.findOneAndUpdate({ userthatowns, userthatowes }, { owes: 0 }, { new: true, useFindAndModify: true });
    console.log('seetleup response', settleUpUsersObject);
    if (settleUpUsersObject !== undefined && settleUpUsersObject !== null && settleUpUsersObject.length !== 0) {
      return ({
        status: 200,
        body: settleUpUsersObject,
      });
    }
    return ({
      status: 500,
      body: 'No dues exists for these users',
    });
  } catch (err) {
    console.log('getgroupSummary error', err);
    return ({
      statusCode: 500,
      body: err,
    });
  }
};

const addUserDeus = async ({
  userthatowes, userthatowns, groupId, owes, groupName,
}) => {
  try {
    const res = await userconnections.findOne({ userthatowes, userthatowns, groupId });
    if (res !== null) {
      //   console.log(res.dataValues.Owes);
      const NewOwes = Number(res.owes) + Number(owes);
      res.owes = NewOwes;
      res.save();
      return (res);
    } if (res === null) {
      const resfornegative = await userconnections.findOne({ userthatowes: userthatowns, userthatowns: userthatowes, groupId });
      if (resfornegative === null) {
        const responsecreate = await userconnections.create({
          userthatowes, userthatowns, groupId, owes, groupName,
        });
        return (responsecreate);
      }
      if (Number(resfornegative.owes) > Number(owes)) {
        resfornegative.owes = Number(resfornegative.owes) - Number(owes);
        resfornegative.save();
        return (resfornegative);
      }
      const newowes = Number(resfornegative.owes) - Number(owes);
      const deleteres = userconnections.deleteOne({ userthatowes: userthatowns, userthatowns: userthatowes, groupId });
      const responsecreate = await userconnections.create({
        userthatowes: userthatowns, userthatowns: userthatowes, groupId, owes: newowes, groupName,
      });
      console.log('deleteres', deleteres);
      responsecreate.save();
      return (resfornegative);
    }
    return ('err');
  } catch (err) {
    console.log(err);
    return (err);
  }
};

const addUserDeusPool = async ({
  groupId, paidByEmail, amount, groupName,
}) => {
  const Userlist = await getGroupUsersWithoutCurrent(groupId, paidByEmail);
  console.log(Userlist, 'user list');
  const userthatowns = paidByEmail;
  const owes = (Number(amount)) / (Number(Number(Userlist.length) + 1));
  //   console.log(owes);
  const addUserDeusRes = [];
  for (let i = 0; i < Userlist.length; i += 1) {
    console.log('UserId1', Userlist[i]);
    const userthatowes = Userlist[i];
    console.log('owes', owes);
    console.log('userthatowns', userthatowns);
    addUserDeusRes.push(addUserDeus({
      userthatowes, userthatowns, groupId, owes, groupName,
    }));
    console.log('after adduserdeus push');
  }
  return ({
    status: 200,
    body: await Promise.all(addUserDeusRes),
  });
};

const getUserOwed = async (emailId) => {
  try {
    console.log('inside getUserOwed', emailId);
    const getUserOwedObject = await userconnections.find({
      userthatowns: emailId,
    });
    if (getUserOwedObject !== undefined && getUserOwedObject !== null && getUserOwedObject.length !== 0) {
      return ({
        status: 200,
        body: getUserOwedObject,
      });
    }
    return ({
      status: 500,
      body: 'No one owes user any thing',
    });
  } catch (err) {
    console.log('getUserOwedObject error', err);
    return ({
      status: 404,
      body: err,
    });
  }
};

const getUserOwes = async (emailId) => {
  try {
    console.log('inside getUserOwes ', emailId);
    const summaryObject = await userconnections.find({
      userthatowes: emailId,
    });
    if (summaryObject !== undefined && summaryObject !== null && summaryObject.length !== 0) {
      return ({
        status: 200,
        body: summaryObject,
      });
    }
    return ({
      status: 500,
      body: 'User owes noothing',
    });
  } catch (err) {
    console.log('getgroupSummary error', err);
    return ({
      status: 404,
      body: err,
    });
  }
};
module.exports = {
  settleUpUsers, getgroupSummary, getDuesForGroup, addUserDeusPool, getUserOwed, getUserOwes,
};
