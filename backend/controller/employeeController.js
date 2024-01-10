const { Router } = require("express");

const verifyToken = require("./middleware");

const router = Router();

// this a in memory array for employtee details
const employees = [
  {
    firstName: "Employee1",
    lastName: "lastName1",
    DoB: "01-01-2024",
    email: "demo@gmail.com",
    employeeId: 1,
  },
];

// this middleware checks JWT token has been provided or not for every request
router.use(verifyToken);

router.post("/addEmplyee", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const DoB = req.body.dateOfBirth;
  const email = req.body.email;
  const employeeId = Math.floor(Math.random() * 10000);

  if (!firstName || !lastName || !DoB || !email) {
    return res.status(400).json({
      message:
        "please provide all values like First name ,Last name, Date of birth, email",
    });
  }

  employees = [...employees, { firstName, lastName, DoB, email, employeeId }];

  res.status(201).json({ message: "employee added" });
});

router.get("/getEmployees", (req, res) => {
  res.json({ employees });
});

router.get("/deleteEmployee/:employeeId", (req, res) => {
  employees = employees.filter((emp) => {
    emp.employeeId.toString() !== req.params.employeeId.toString();
  });

  res.json({ message: "employee deleted" });
});

module.exports = router;
