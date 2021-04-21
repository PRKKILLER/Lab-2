/* eslint-disable no-console */
const express = require('express');
const kafka = require('../kafka/client');

const router = express.Router();
const { checkAuth } = require('../auth/passport');

router.post('/addExpense', checkAuth, async (req, res) => {
  req.body.path = 'addExpense';
  kafka.make_Request('transaction', req.body, (err, results) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('Inside err');
      res.status(500).json({
        msg: 'System Error, Try Again.',
      });
    } else if (results.status === 200) {
      console.log('data inside route', results);
      res.status(200).json({
        data: results.data,
      });
      res.end();
    } else {
      res.json({
        data: results,
      });
      res.end();
    }
  });
});

router.post('/showExpanse', async (req, res) => {
  req.body.path = 'showExpanse';
  kafka.make_Request('transaction', req.body, (err, results) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('Inside err');
      res.status(500).json({
        msg: 'System Error, Try Again.',
      });
    } else if (results.status === 200) {
      console.log('data inside route', results);
      res.status(200).json({
        data: results.data,
      });
      res.end();
    } else {
      res.json({
        data: results,
      });
      res.end();
    }
  });
});

router.post('/groupSummary', async (req, res) => {
  req.body.path = 'groupSummary';
  kafka.make_Request('userconnections', req.body, (err, results) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('Inside err');
      res.status(500).json({
        msg: 'System Error, Try Again.',
      });
    } else if (results.status === 200) {
      console.log('data inside route', results);
      res.status(200).json({
        data: results.data,
      });
      res.end();
    } else {
      res.json({
        data: results,
      });
      res.end();
    }
  });
  // const userSummaryres = await getUserSummary(GroupId);
  // console.log('received data', userSummaryres);
  // if (userSummaryres.status === 200) {
  //   console.log(userSummaryres);
  //   res.send(userSummaryres);
  // } else {
  //   res.status(500).send(userSummaryres.body);
  // }
});
module.exports = router;
