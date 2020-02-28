const jwt = require("jsonwebtoken");

module.exports = function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = { expiresIn: "1hr" };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};
