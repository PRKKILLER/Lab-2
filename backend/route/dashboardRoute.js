/* eslint-disable no-console */
const express = require('express');
const kafka = require('../kafka/client');

const router = express.Router();
const { checkAuth } = require('../auth/passport');

router.post('/settleUp', checkAuth, async (req, res) => {
  req.body.path = 'settleUp';
  kafka.make_Request('userconnections', req.body, (err, results) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('Inside err');
      res.status(500).json({
        msg: 'System Error, Try Again.',
      });
    } else if (results.status === 200) {
      console.log('data inside settleUp route', results);
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
router.post('/userOwes', async (req, res) => {
  req.body.path = 'userOwes';
  kafka.make_Request('userconnections', req.body, (err, results) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('Inside err');
      res.status(500).json({
        msg: 'System Error, Try Again.',
      });
    } else if (results.status === 200) {
      console.log('data inside userOwes route', results);
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
router.post('/userOwed', async (req, res) => {
  req.body.path = 'userOwed';
  kafka.make_Request('userconnections', req.body, (err, results) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('Inside err');
      res.status(500).json({
        msg: 'System Error, Try Again.',
      });
    } else if (results.status === 200) {
      console.log('data inside userOwed route', results);
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

// router.post('/getUserName', async (req, res) => {
//   try {
//     const {
//       EmailId,
//     } = req.body;
//     const response = await findUser(EmailId);
//     res.status(200).send({ response });
//   } catch (err) {
//     res.status(500).send({ error: err });
//   }
// });

module.exports = router;
