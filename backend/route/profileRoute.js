/* eslint-disable no-console */
const express = require('express');

const multer = require('multer');
const kafka = require('../kafka/client');

const router = express.Router();
const { checkAuth } = require('../auth/passport');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const { s3, getParams } = require('../services/s3uploader');

router.post('/userDetails', checkAuth, async (req, res) => {
  req.body.path = 'updateDetails';
  kafka.make_Request('user', req.body, (err, results) => {
    if (err) {
      console.log('Inside err');
      res.status(500).json({
        msg: 'System Error, Try Again.',
      });
    } else {
      res.status(200).json({
        body: results.data,
      });
      res.end();
    }
  });
});

router.post('/addProfilePicture', upload.single('file'), checkAuth, async (req, res) => {
  req.body.path = 'updateProfilePicture';
  const { file } = req;
  const { emailId } = req.body;
  console.log('inside route');
  console.log(emailId, 'addProfilePicture');
  const params = getParams(emailId, file.buffer, file.mimetype);
  s3.upload(params, async (error, data) => {
    res.status(200).json({
      data,
    });
    res.end();
  });
});
module.exports = router;
