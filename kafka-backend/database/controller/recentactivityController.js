/* eslint-disable no-console */
const Recentactivity = require('../models/recentactivityModel');

const addRecentActivity = async ({
  groupId,
  groupName,
  activity,
}) => {
  const res = await new Recentactivity({
    groupId,
    groupName,
    activity,
  });
  try {
    await res.save();
    res.data = res;
    res.status = 200;
    return (res);
  } catch (e) {
    console.log(e);
    res.status = 500;
    res.error = e;
    console.log('adding addRecentActivity failed!!');
    return (res);
  }
};
module.exports = { addRecentActivity };
