/* eslint-disable consistent-return */
const express = require('express');

const morgan = require('morgan');

const app = express();
const bodyParser = require('body-parser');

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

// app.use('/profile', require('./routes/profileRoute'));
// app.use('/group', require('./routes/createGroupRoute'));
// app.use('/mygroup', require('./routes/myGroupRoute'));
// app.use('/RecentActivity', require('./routes/recentActivityRoute'));
// app.use('/individualgroup', require('./routes/individualGroupRoute'));
// app.use('/dashboard', require('./routes/dashboardRoute'));

// start your server on port 3000
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`listening on port ${port}`));