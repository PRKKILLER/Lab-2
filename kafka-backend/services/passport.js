const userModel = require('../database/models/userModel');

const passportHandler = async (msg, callback) => {
  const res = {};
  try {
    const { id } = msg;
    const userObject = await userModel.findOne(id).exec();
    if (userObject !== undefined && userObject !== null) {
      res.status = 200;
      res.body = userObject;
      callback(null, res);
    } else {
      res.status = 500;
      res.body = 'user does not exist';
      callback(null, res);
    }
  } catch (e) {
    res.status = 500;
    res.body = e;
    callback(null, res);
  }
};

function handleRequest(msg, callback) {
  passportHandler(msg, callback);
}

exports.handleRequest = handleRequest;
