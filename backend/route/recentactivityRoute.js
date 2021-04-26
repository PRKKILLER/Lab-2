/* eslint-disable no-console */
const express = require('express');
const kafka = require('../kafka/client');

const router = express.Router();
const { checkAuth } = require('../auth/passport');

router.post('/getRecentActivity', checkAuth, async (req, res) => {
  req.body.path = 'getRecentActivity';
  kafka.make_Request('recentactivity', req.body, (err, results) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('Inside err');
      res.status(500).json({
        msg: 'System Error, Try Again.',
      });
    } else if (results.status === 200) {
      console.log('data inside getRecentActivity route', results);
      res.status(200).json({
        data: results.data,
      });
      res.end();
    } else if (results.status === 204) {
      res.status(200).json({
        data: results.data,
      });
      res.end();
    }
  });
});

module.exports = router;
