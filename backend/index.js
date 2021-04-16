/* eslint-disable no-console */
/* eslint-disable consistent-return */
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
app.use(session({
  secret: 'cmpe273_kafka_passport_mongo',
  resave: false,
  saveUninitialized: false,
  duration: 60 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

app.use('/userauth', require('./route/authRoute'));
app.use('/userProfile', require('./route/profileRoute'));
app.use('/group', require('./route/createGroupRoute'));
// app.use('/group', require('./routes/createGroupRoute'));
// app.use('/mygroup', require('./routes/myGroupRoute'));
// app.use('/RecentActivity', require('./routes/recentActivityRoute'));
// app.use('/individualgroup', require('./routes/individualGroupRoute'));
// app.use('/dashboard', require('./routes/dashboardRoute'));

// start your server on port 3002
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`listening on port ${port}`));
