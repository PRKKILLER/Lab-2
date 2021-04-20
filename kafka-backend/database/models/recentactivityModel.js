const mongoose = require('../mongoose');

const { Schema } = mongoose;
const recentactivitySchema = new Schema({
  activity: {
    type: String,
    required: true,
  },
  groupId: {
    type: String,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
});

const recentactivityModel = mongoose.model('recentactivity', recentactivitySchema);
module.exports = recentactivityModel;
