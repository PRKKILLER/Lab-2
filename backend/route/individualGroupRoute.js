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
        data: results.data,
      });
      res.end();
    }
  });
});

router.post('/showExpanse', checkAuth, async (req, res) => {
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
        data: results.data,
      });
      res.end();
    }
  });
});

router.post('/createNote', checkAuth, async (req, res) => {
  req.body.path = 'createNote';
  kafka.make_Request('notes', req.body, (err, results) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('Inside err');
      res.status(500).json({
        msg: 'System Error, Try Again.',
      });
    } else if (results.status === 200) {
      console.log('data inside createnote', results);
      res.status(200).json({
        data: results.data,
      });
      res.end();
    } else {
      res.json({
        data: results.data,
      });
      res.end();
    }
  });
});
router.post('/deleteNote', checkAuth, async (req, res) => {
  req.body.path = 'deleteNote';
  kafka.make_Request('notes', req.body, (err, results) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('Inside err');
      res.status(500).json({
        msg: 'System Error, Try Again.',
      });
    } else if (results.status === 200) {
      console.log('data inside deletenote route', results);
      res.status(200).json({
        data: results.data,
      });
      res.end();
    } else if (results.status === 500) {
      console.log('u didnt write the note', results);
      res.status(200).json({
        data: 'u didnt write the note',
      });
      res.end();
    } else if (results.status === 400) {
      console.log('No Note Found', results);
      res.status(200).json({
        data: 'No Note Found',
      });
      res.end();
    } else {
      res.json({
        data: results.data,
      });
      res.end();
    }
  });
});
router.post('/getNote', checkAuth, async (req, res) => {
  req.body.path = 'getNote';
  kafka.make_Request('notes', req.body, (err, results) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('Inside err');
      res.status(500).json({
        msg: 'System Error, Try Again.',
      });
    } else if (results.status === 200) {
      console.log('data inside deletenote route', results);
      res.status(200).json({
        data: results.data,
      });
      res.end();
    } else {
      res.json({
        data: results.data,
      });
      res.end();
    }
  });
});

router.post('/Groupsummary', checkAuth, async (req, res) => {
  req.body.path = 'groupSummary';
  kafka.make_Request('userconnections', req.body, (err, results) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('Inside err');
      res.status(500).json({
        msg: 'System Error, Try Again.',
      });
    } else if (results.status === 200) {
      console.log('data iside group summary route', results);
      res.status(200).json({
        data: results.data,
      });
      res.end();
    } else {
      res.json({
        data: results.data,
      });
      res.end();
    }
  });
});
module.exports = router;
