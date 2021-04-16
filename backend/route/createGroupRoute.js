/* eslint-disable no-console */
const express = require('express');

const multer = require('multer');
const kafka = require('../kafka/client');

const router = express.Router();
const { checkAuth } = require('../auth/passport');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const { s3, getParams } = require('../services/s3uploader');

router.post('/creategroup', checkAuth, async (req, res) => {
  req.body.path = 'creategroup';
  kafka.make_Request('group', req.body, (err, results) => {
    if (err) {
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

router.post('/grouppicture', upload.single('file'), checkAuth, async (req, res) => {
  const { file } = req;
  const { groupId } = req.body;
  req.body.path = 'grouppicture';
  const params = getParams(groupId, file.buffer, file.mimetype);
  s3.upload(params, async (error, data) => {
    console.log(await data.Location);
    req.body.URL = data.Location;
    kafka.make_Request('group', req.body, (err, results) => {
      if (err) {
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
});

router.post('/getAllUsersExceptCurrent', async (req, res) => {
  console.log('line 68', req);
  req.body.path = 'getAllUsersExceptCurrent';
  kafka.make_Request('user', req.body, (err, results) => {
    if (err) {
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
