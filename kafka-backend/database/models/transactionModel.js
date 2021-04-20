const mongoose = require('../mongoose');

const { Schema } = mongoose;
const transactionSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  groupId: {
    type: String,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  paidByEmail: {
    type: String,
    required: true,
  },
  paidByName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  notes: [{
    name: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
  }],
});
const transactionModel = mongoose.model('transaction', transactionSchema);
module.exports = transactionModel;
