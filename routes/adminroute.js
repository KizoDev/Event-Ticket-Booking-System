const express = require('express');
const router = express.Router();
const authenticate = require('./authMiddleware');

router.post('/sensitive-operation', authenticate, (req, res) => {
  res.status(200).send('Sensitive operation performed successfully.');
});

router.get('/public', (req, res) => {
  res.send('This is a public endpoint.');
});

module.exports = router;
