const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const authController = require("./controller/authController");

app.use("/auth", authController);

const employeeController = require("./controller/employeeController");

app.use("/employee", employeeController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
