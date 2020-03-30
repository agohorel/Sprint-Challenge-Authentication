const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    jwt.verify(authorization, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ you: "shall not pass!" });
      } else {
        req.decodedToken = decoded;
        next();
      }
    });
  } else {
    res.status(400).json({ msg: "no credentials provided" });
  }
};
