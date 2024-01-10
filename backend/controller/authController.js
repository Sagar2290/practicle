const { Router } = require("express");
const jwt = require("jsonwebtoken");

const JWTSCRETE = "myjwtsecret";

const router = Router();

const authCredentials = {
  email: "demouser@gmail.com",
  password: "Demo@123",
  username: "demo user",
};

router.post("/login", (req, res) => {
  const email = req.body["email"];
  const password = req.body["password"];

  if (!email || !password) {
    return res.status(400).json({ message: "email and password required" });
  }

  if (
    email === authCredentials.email &&
    password === authCredentials.password
  ) {
    const token = jwt.sign({ email }, JWTSCRETE);

    return res.json({ token, user: authCredentials.username });
  }

  res.status(401).json({ message: "Please pass valid credentials" });
});

module.exports = router;
