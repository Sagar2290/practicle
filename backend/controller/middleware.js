const jwt = require("jsonwebtoken");

const JWTSCRETE = "myjwtsecret";

const router = (req, res, next) => {
  // need to add header with value like below
  // Bearer {your generate token}
  const token = req.headers["authentication"]?.split(" ")[1];

  jwt.verify(token, JWTSCRETE, (err, data) => {
    if (err) {
      return res.status(401).json({ message: "user not authenticated" });
    }
    next();
  });
};

module.exports = router;
