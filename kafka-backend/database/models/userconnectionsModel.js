const mongoose = require('../mongoose');

const { Schema } = mongoose;
const userconnectionsSchema = new Schema({
  userthatowes: {
    type: String,
    required: true,
  },
  userthatowns: {
    type: String,
    required: true,
  },
  owes: {
    type: Number,
    default: 0,
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

const userconnectionsModel = mongoose.model('userconnections', userconnectionsSchema);
module.exports = userconnectionsModel;
