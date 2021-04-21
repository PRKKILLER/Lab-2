/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const recentactivityModel = require('../database/models/recentactivityModel');

const getRecentActivity = async (msg, callback) => {
  const res = {};
  console.log('data inside recent activity', msg);
  try {
    // eslint-disable-next-line max-len
    const activityRes = await recentactivityModel.find({ groupId: msg.groupId });
    if (activityRes === undefined || activityRes === null || activityRes.length === 0) {
      console.log('No recent activity');
      res.data = 'No recent activity';
      res.status = 500;
      callback(null, res);
    } else {
      res.data = activityRes;
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
  if (msg.path === 'getRecentActivity') {
    delete msg.path;
    getRecentActivity(msg, callback);
  }
}
exports.handleRequest = handleRequest;
