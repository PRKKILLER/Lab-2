const express = require('express');
const kafka = require('../kafka/client');

const router = express.Router();
const { checkAuth } = require('../auth/passport');

router.post('/groupsList', checkAuth, async (req, res) => {
  req.body.path = 'groupslist';
  kafka.make_Request('group', req.body, (err, results) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('Inside err');
      res.status(500).json({
        msg: 'System Error, Try Again.',
      });
    } else if (results.status === 200) {
      res.status(200).json({
        data: results,
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

router.post('/acceptinvitation', async (req, res) => {
  req.body.path = 'acceptinvitation';
  kafka.make_Request('group', req.body, (err, results) => {
    if (err) { // eslint-disable-next-line no-console
      console.log('Inside err');
      res.status(500).json({
        msg: 'System Error, Try Again.',
      });
    } else if (results.status === 200) {
      res.status(200).json({
        data: results,
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

router.post('/leaveGroup', async (req, res) => {
  req.body.path = 'leavegroup';
  kafka.make_Request('group', req.body, (err, results) => {
    if (err) { // eslint-disable-next-line no-console
      console.log('Inside err');
      res.status(500).json({
        msg: 'System Error, Try Again.',
      });
    } else if (results.status === 200) {
      res.status(200).json({
        data: results,
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

module.exports = router;
