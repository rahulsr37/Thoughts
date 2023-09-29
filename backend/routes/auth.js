const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

// Storing the jwt key in a variable
const JWT_SECRET = process.env.JWT_SECRET;


//Route 1 - Create a User using POST - /createuser
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // express validator error handling returning bad request if error is present
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Creating a user after checking whether the sign-up email is already present or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(400).json({success, error: `User with this email already exists!` });
      }

      // Hasing the user entered password
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);

      // Creating a user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      });

      // creating a token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      success = true
      res.json({success, authToken });
      console.log(`User created of the name ${req.body.name}`);
    } catch (error) {
      console.log(`Something went wrong`);
      res.status(500).send(`Something went wrong ${error.message}`);
    }
  }
);

// Route 2 - Login route for user - POST - /login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success =  false;
    // express validator error handling returning bad request if error is present
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring email and password
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({success, error: `Please enter correct credentials!` });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        res.status(400).json({success, error: `Please enter correct credentials!` });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(payload, JWT_SECRET);
      success = true
      res.json({success, authToken });
      console.log(`User loggedin of the name ${user.name}`);
    } catch (error) {
      console.log(`Unable to login, Something went wrong!`);
      res
        .status(500)
        .send(`Unable to login, Something went wrong! ${error.message}`);
    }
  }
);

//ROUTE-3 Get logged in user details using: POST : /fetchuser" Login required
router.post("/fetchuser", fetchuser, async (req, res) => {
  try {
    // getting userID from middleware
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
    console.log(`${user.name} details have been fetched`);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
