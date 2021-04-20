/* eslint-disable no-console */
const userconnections = require('../models/userconnectionsModel');
const { getGroupUsersWithoutCurrent } = require('./groupController');

const getDuesForGroup = async (groupId, userId) => {
  try {
    console.log('inside getDuesForGroup userid', userId);
    console.log('inside getDuesForGroup groupId', groupId);
    const duesObject = await userconnections.find({
      groupId,
      userthatowes: userId,
      owes: { $ne: 0 },
    });
    if (duesObject !== undefined || duesObject !== null) {
      return {
        statusCode: 200,
        body: duesObject,
      };
    }
    return {
      statusCode: 404,
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

const addUserDeus = async ({
  userthatowes, userthatowns, groupId, owes, groupName,
}) => {
  try {
    const res = await userconnections.findOne({ userthatowes, userthatowns, groupId });
    console.log('line 38', res);
    if (res !== null) {
      console.log('line 40');
      //   console.log(res.dataValues.Owes);
      const NewOwes = Number(res.owes) + Number(owes);
      res.owes = NewOwes;
      res.save();
      return (res);
    }
    console.log('line 47');
    const responsecreate = await userconnections.create({
      userthatowes, userthatowns, groupId, owes, groupName,
    });
    console.log('line 51');
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
module.exports = { getDuesForGroup, addUserDeusPool };
