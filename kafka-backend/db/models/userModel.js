const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const salt = 10;
const usersSchema = new Schema({
  emailId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
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

const userModel = mongoose.model('user', usersSchema);
userModel.pre('save', (next) => {
  if (!this.isModified('password')) {
    next();
  }
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});
module.exports = userModel;
