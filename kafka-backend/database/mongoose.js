/* eslint-disable no-console */
const mongoose = require('mongoose');

const url = 'mongodb+srv://Pratik:pass%40123@cmpe273.njv4y.mongodb.net/splitwisedb?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('successfully connected to the database');
}).catch((err) => {
  console.log(`error connecting to the database: ${err}`);
  process.exit();
});
module.exports = mongoose;
