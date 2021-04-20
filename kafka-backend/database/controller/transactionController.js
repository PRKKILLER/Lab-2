/* eslint-disable no-console */
const Transaction = require('../models/transactionModel');

const addTransaction = async ({
  groupId,
  groupName,
  paidByEmail,
  paidByName,
  description,
  amount,
}) => {
  const res = await new Transaction({
    groupId,
    groupName,
    paidByEmail,
    paidByName,
    description,
    amount,
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
    console.log('adding transaction failed!!');
    return (res);
  }
};
module.exports = { addTransaction };
