/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-continue */
const group = require('../models/groupModel');

const getGroupUsersWithoutCurrent = async (groupId, paidByEmail) => {
  const emailId = paidByEmail;
  const listofusers = [];
  console.log('in side getGroupUsersWithoutCurrent', emailId);
  try {
    // eslint-disable-next-line max-len
    const Res = await group.findById(groupId);
    for (let i = 0; i < Res.users.length; i += 1) {
      if (Res.users[i].emailId === emailId) {
        continue;
      } else if (Res.users[i].flag === true) {
        listofusers.push(Res.users[i].emailId);
      }
    }
    console.log(listofusers);
    return (listofusers);
  } catch (e) {
    console.log(e);
  }
};

const getGroupsList = async (msg) => {
  console.log('inside getGroupslist list', msg);
  // eslint-disable-next-line new-cap
  try {
    // eslint-disable-next-line max-len
    const Res = await group.find().where('users.emailId').equals(msg.emailId);
    console.log('response from getgroups', Res);
    return (Res);
  } catch (e) {
    console.log('grouplist error', e);
  }
};

module.exports = { getGroupUsersWithoutCurrent, getGroupsList };
