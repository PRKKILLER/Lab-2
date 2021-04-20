/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const { addTransaction } = require('../database/controller/transactionController');
const { addRecentActivity } = require('../database/controller/recentactivityController');
const { addUserDeusPool } = require('../database/controller/userConnectionsController');

const addExpense = async (msg, callback) => {
  const res = {};
  console.log('data inside addexpense', msg);
  const {
    groupId,
    groupName,
    paidByEmail,
    paidByName,
    description,
    amount,
  } = msg;
  console.log('inside add expense', msg);
  // eslint-disable-next-line new-cap
  try {
    // eslint-disable-next-line max-len
    const addTransactionresponse = await addTransaction({
      groupId,
      groupName,
      paidByEmail,
      paidByName,
      description,
      amount,
    });
    if (addTransactionresponse.status === 200) {
      const activity = `${paidByName} added ${description} expense for ${amount}  in  ${groupName}`;
      console.log(activity);
      const addActivityResponse = await addRecentActivity({ activity, groupId, groupName });
      // making Changes user-user desus group
      const addUserDeusRes = await addUserDeusPool({
        groupId, paidByEmail, amount, groupName,
      });
      console.log('after adding user pool********************************', addActivityResponse, addUserDeusRes);

      if (addUserDeusRes.status === 200 && addActivityResponse.status === 200) {
        res.status = 200;
        res.data = {
          transactionbody: addTransactionresponse.body,
          activitybody: addActivityResponse.body,
          addduesbody: addUserDeusRes.body,
        };
        console.log('fuckkkkkkkkkk');
        callback(null, res);
      } else if (addActivityResponse.status === 500) {
        res.status = 500;
        res.data = addActivityResponse.body;
        callback(null, res);
      } else if (addUserDeusRes.status === 500) {
        res.status = 500;
        res.data = addUserDeusRes.body;
        callback(null, res);
      }
    } else {
      res.status = 500;
      res.data = addTransactionresponse.body;
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
  if (msg.path === 'addExpense') {
    delete msg.path;
    addExpense(msg, callback);
  }
  // } else if (msg.path === 'login') {
  //   delete msg.path;
  //   login(msg, callback);
  // } else if (msg.path === 'updateDetails') {
  //   delete msg.path;
  //   updateDetails(msg, callback);
  // } else if (msg.path === 'getAllUsersExceptCurrent') {
  //   delete msg.path;
  //   getAllUsersExceptCurrent(msg, callback);
  // }
}

exports.handleRequest = handleRequest;
