const auth = require('basic-auth');

const authenticate = (req, res, next) => {
  const user = auth(req);

  // Replace these with your actual username and password
  const username = process.env.BASIC_AUTH_USERNAME || 'admin';
  const password = process.env.BASIC_AUTH_PASSWORD || 'password';

  if (!user || user.name !== username || user.pass !== password) {
    res.set('WWW-Authenticate', 'Basic realm="Sensitive Operations"');
    return res.status(401).send('Access denied. Invalid credentials.');
  }

  next(); 
};

module.exports = authenticate;
