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
  },
  number: {
    type: String,
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
    default: 'userPlaceholder.png',
  },
},
{
  versionKey: false,
});
usersSchema.plugin(require('mongoose-bcrypt'));

const userModel = mongoose.model('user', usersSchema);

module.exports = userModel;
