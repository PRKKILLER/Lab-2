/* eslint-disable prefer-spread */
/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const recentactivityModel = require('../database/models/recentactivityModel');
const { getGroupsList } = require('../database/controller/groupController');

const callallactivities = async (groupList) => {
  const activityRes = [];
  try {
    for (let i = 0; i < groupList.length; i += 1) {
      console.log('inside for loop 10');
      console.log(groupList[i], 'dasdasdasdasdasdasdasdasdasdas');
      const activityofeachgrp = recentactivityModel.find({ groupId: groupList[i]._id }).exec();
      console.log(activityofeachgrp, 'activity of each grp');
      activityRes.push(activityofeachgrp);
    }
  } catch (e) {
    console.log(e);
  }
  console.log(activityRes);
  return (await Promise.all(activityRes));
};

const getRecentActivity = async (msg, callback) => {
  const res = {};
  console.log('data inside recent activity', msg);
  try {
    // eslint-disable-next-line max-len
    const groupList = await getGroupsList(msg);
    console.log(groupList, 'group list');
    if (groupList !== null && groupList !== undefined && groupList.length !== 0) {
      const activityRes = await callallactivities(groupList);
      if (activityRes === undefined || activityRes === null || activityRes.length === 0) {
        console.log('No recent activity');
        res.data = 'No recent activity';
        res.status = 204;
        callback(null, res);
      } else {
        res.data = activityRes;
        res.status = 200;
        callback(null, res);
      }
    } else {
      console.log('No recent activity');
      res.data = 'No recent activity';
      res.status = 204;
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
