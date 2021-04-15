/* eslint-disable import/order */
/* eslint-disable no-console */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const express = require('express');
const kafka = require('../kafka/client');
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
const router = express.Router();
const jwt = require('jsonwebtoken');
const { auth, checkAuth } = require('../auth/passport');
// Route to handle Post Request Call
// eslint-disable-next-line camelcase

router.post('/signup', async (req, res) => {
  // Object.keys(req.body).forEach((key) => {
  //   req.body = JSON.parse(key);
  // });
  req.body.path = 'signup';
  console.log(req.body);
  kafka.make_Request('signup', req.body, (err, results) => {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log('Inside err');
      res.status(500).json({
        msg: 'System Error, Try Again.',
      });
    } else if (results.status === 404) {
      res.status(404).json({
        msg: 'User Exist',
      });
    } else {
      const token = jwt.sign({
      // eslint-disable-next-line no-underscore-dangle
        id: results.data._id,
      },
      process.env.SECRET,
      {
        expiresIn: 1008000,
      });
      const jwtToken = `JWT ${token}`;
      console.log(jwtToken);
      // eslint-disable-next-line no-param-reassign
      results.token = jwtToken;
      console.log('Inside else');
      res.json({
        updatedList: results,
      });
      res.end();
    }
  });
});
auth();

router.post('/login', async (req, res) => {
  // Object.keys(req.body).forEach((key) => {
  //   req.body = JSON.parse(key);
  // });
  console.log('63', process.env.SECRET);
  req.body.path = 'login';
  console.log(req.body);
  kafka.make_Request('login', req.body, (err, results) => {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log('Inside err');
      res.status(500).json({
        msg: 'System Error, Try Again.',
      });
    } else {
      const token = jwt.sign({
      // eslint-disable-next-line no-underscore-dangle
        id: results.data._id,
      },
      process.env.SECRET,
      {
        expiresIn: 1008000,
      });
      const jwtToken = `JWT ${token}`;
      console.log(jwtToken, 'JWT token');
      // eslint-disable-next-line no-param-reassign
      results.token = jwtToken;
      res.status(200).json({
        updatedList: results,
      });
      res.end();
    }
  });
});

// router.post('/updateUserDetails', async (req, res) => {
//   console.log('Inside UpdereUserDetails');
//   const {
//     EmailId, Name, PhoneNumber, Currency,
//   } = req.body;
//   try {
//     const object = await Users.update({ Name, PhoneNumber, Currency }, {
//       where: {
//         EmailId,
//       },
//     });
//     res.status(200).send({
//       data: object,
//     });
//   } catch (err) {
//     res.status(500).send({
//       data: err,
//     });
//   }
// });

// router.post('/addProfilePicture', upload.single('file'), async (req, res) => {
//   console.log('Inside Picture router');
//   const { file } = req;
//   const { EmailId } = req.body;
//   console.log('EmailId', EmailId);
//   console.log('file', file);
//   const params = getParams(EmailId, file.buffer, file.mimetype);
//   s3.upload(params, async (err, data) => {
//     console.log(await data.Location);
//     const profilepicupdateRes = await Users.update({ Picture: data.Location }, {
//       where: {
//         EmailId,
//       },
//     });
//     console.log('res', profilepicupdateRes);
//     res.send({
//       status: 200,
//       data: profilepicupdateRes,
//     });
//   });
// });
// router.post('/login', async (req, res) => {
//   // Object.keys(req.body).forEach((key) => {
//   //   req.body = JSON.parse(key);
//   // });
//   const EmailId = await req.body.EmailId;
//   const Password = await req.body.Password;
//   console.log(EmailId, Password);
//   try {
//     const user = await Users.findOne({ where: { EmailId } });
//     console.log(' login response ', user);
//     if (user === undefined || user === null) {
//       res.send(500).send({ body: 'No User Found' });
//     }
//     bcrypt.compare(Password, user.Password, (
//       err,
//       isMatch,
//     ) => {
//       // console.log(bcrypt.hashSync(password, 10));
//       // console.log(userDetails.password);
//       if (err) {
//         console.log('err', err);
//         res.status(500).send({
//           errors: {
//             body: err,
//           },
//         });
//       } else if (!isMatch) {
//         res.status(400).send({
//           errors: {
//             body: 'Unauth User',
//           },
//         });
//       } else {
//         console.log('Successful log in');
//         delete user.dataValues.Password;
//         console.log('user onject', user.EmailId);
//         res.status(200).send({
//           user,
//         });
//       }
//     });
//   } catch (err) {
//     console.log('error', err);
//     res.status(500).send({
//       body: err,
//     });
//   }
// });

// router.post('/updateUserDetails', async (req, res) => {
//   console.log('Inside UpdereUserDetails');
//   const {
//     EmailId, Name, PhoneNumber, Currency,
//   } = req.body;
//   try {
//     const object = await Users.update({ Name, PhoneNumber, Currency }, {
//       where: {
//         EmailId,
//       },
//     });
//     res.status(200).send({
//       data: object,
//     });
//   } catch (err) {
//     res.status(500).send({
//       data: err,
//     });
//   }
// });

// router.post('/addProfilePicture', upload.single('file'), async (req, res) => {
//   console.log('Inside Picture router');
//   const { file } = req;
//   const { EmailId } = req.body;
//   console.log('EmailId', EmailId);
//   console.log('file', file);
//   const params = getParams(EmailId, file.buffer, file.mimetype);
//   s3.upload(params, async (err, data) => {
//     console.log(await data.Location);
//     const profilepicupdateRes = await Users.update({ Picture: data.Location }, {
//       where: {
//         EmailId,
//       },
//     });
//     console.log('res', profilepicupdateRes);
//     res.send({
//       status: 200,
//       data: profilepicupdateRes,
//     });
//   });
// });
module.exports = router;
