const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('../mongoose');

const { Schema } = mongoose;
const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  creatorId: {
    type: String,
  },
  URL: {
    type: String,
  },
  expenses: [{
    expenseID: {
      type: String,
      required: false,
    },
  }],
  users: [{
    emailId: {
      type: String,
      required: true,
    },
    flag: {
      type: Boolean,
      required: true,
      default: false,
    },
  }],
});

groupSchema.plugin(uniqueValidator);
const groupModel = mongoose.model('group', groupSchema);
module.exports = groupModel;
