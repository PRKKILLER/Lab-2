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

const gettransactions = async (groupId) => {
  const res = {};
  try {
    const resTransaction = await Transaction.find({ groupId }).exec();
    if (resTransaction !== null && resTransaction !== undefined && resTransaction.length !== 0) {
      console.log(resTransaction);
      res.status = 200;
      res.data = resTransaction;
      return (res);
    }
    res.status = 500;
    res.data = 'No transactions for groupId';
    return (res);
  } catch (e) {
    console.log(e);
    res.data = e;
    res.status = 404;
    console.log('get transaction failed!!');
    return (res);
  }
};
module.exports = { addTransaction, gettransactions };
