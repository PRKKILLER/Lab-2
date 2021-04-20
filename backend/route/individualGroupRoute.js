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
