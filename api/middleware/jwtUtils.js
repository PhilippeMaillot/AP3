const jwt = require('jsonwebtoken');

function generateToken(user, type = 'default') {
  const payload = {
    id: user.id_user,
    id_club: user.id_club,
    username: user.club_name,
    mail: user.club_mail,
  };

  const secret = process.env.MY_SECRET_KEY;
  const options = {
    expiresIn: '4h', // Token will expire in 4 hours by default
  };

  if (type === 'mobile') {
    // Custom options for mobile token
    options.expiresIn = '7d'; // Token will expire in 7 days for mobile
    // Add any other custom payload for mobile token here if needed
  }

  return jwt.sign(payload, secret, options);
}

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, process.env.MY_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = {
  generateToken,
  verifyToken,
};
