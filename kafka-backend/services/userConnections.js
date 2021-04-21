/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const { getgroupSummary } = require('../database/controller/userConnectionsController');

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

function handleRequest(msg, callback) {
  if (msg.path === 'groupSummary') {
    delete msg.path;
    groupSummary(msg, callback);
  }
  // } else if (msg.path === 'showExpanse') {
  //   delete msg.path;
  //   showExpanse(msg, callback);
  // }
  // } else if (msg.path === 'updateDetails') {
  //   delete msg.path;
  //   updateDetails(msg, callback);
  // } else if (msg.path === 'getAllUsersExceptCurrent') {
  //   delete msg.path;
  //   getAllUsersExceptCurrent(msg, callback);
  // }
}

exports.handleRequest = handleRequest;
