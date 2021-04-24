// const bcrypt = require('bcrypt');
const mongoose = require('../mongoose');

const { Schema } = mongoose;
// const salt = 10;
const usersSchema = new Schema({
  emailId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    bcrypt: true,
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    default: '000000000000',
  },
  language: {
    type: String,
    default: 'en',
  },
  currency: {
    type: String,
    default: 'USD',
  },
  timezone: {
    type: String,
    default: 'PST',
  },
  image: {
    type: String,
    default: 'https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal36-100px.png',
  },
},
{
  versionKey: false,
});
usersSchema.plugin(require('mongoose-bcrypt'));

const userModel = mongoose.model('user', usersSchema);

module.exports = userModel;
