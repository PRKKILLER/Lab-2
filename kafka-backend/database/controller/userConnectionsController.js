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
      return {
        status: 200,
        body: duesObject,
      };
    }
    return {
      status: 404,
      body: 'No such dues exists',
    };
  } catch (err) {
    console.log('err', err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};
const getgroupSummary = async (groupId) => {
  try {
    console.log('inside getgroupSummary groupId', groupId);
    const summaryObject = await userconnections.find({
      groupId,
    });
    if (summaryObject !== undefined && summaryObject !== null && summaryObject.lenght !== 0) {
      return {
        status: 200,
        body: summaryObject,
      };
    }
    return {
      status: 500,
      body: 'No dues exists for the group',
    };
  } catch (err) {
    console.log('getgroupSummary error', err);
    return {
      statusCode: 500,
      body: err,
    };
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
    }
    const responsecreate = await userconnections.create({
      userthatowes, userthatowns, groupId, owes, groupName,
    });
    return (responsecreate);
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
module.exports = { getgroupSummary, getDuesForGroup, addUserDeusPool };
