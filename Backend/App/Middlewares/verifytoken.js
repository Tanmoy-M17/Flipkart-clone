const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const decoded = jwt.verify(token, "masai");
    if (decoded) {
      const userID = decoded.userID;
      req.body.userId = userID;
      next();
    } else {
      res.send("Please Login First");
    }
  } else {
    res.send("Please Login First");
  }
};

module.exports = {
  verifyToken,
};
