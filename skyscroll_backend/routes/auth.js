const express = require("express");
const user = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "IamAGood$boy";
const fetchuser = require("../middleware/fetchuser");
let success = false;
//end point for creating a new user, using /createuser
router.post(
  "/createuser",
  [
    body("name", "Name must be atleast three letters long").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 letters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //checking for basic requirements of name, email, password
    const error = validationResult(req);
    if (!error.isEmpty()) {
      success = false;
      return res.status(400).json({ success, error}); 
    }
    try {
      //checking if the email already exists
      let user1 = await user.findOne({ email: req.body.email });
      if (user1) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Sorry this email already exists." });
      }
      //encrypting the password before storing using salt and hashing
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //creating an entry in the database for the user
      user1 = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      //sending an auth token using jwt to the user
      const data = {
        user: {
          id: user1.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.status(200).json({ success, authToken });
    } catch (error) {
      //checking for an error in the try catch block
      success = false;
      res.status(500).json({ success, error });
    }
  }
);
//endpoint for login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 letters long").exists(),
  ],
  async (req, res) => {
    //checking for basic requirements of email, password
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      //checking if the email exists
      let user1 = await user.findOne({ email: req.body.email });
      if (!user1) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please enter correct credentials" });
      }
      const { email, password } = req.body;
      //checking the password
      const passCompare = await bcrypt.compare(password, user1.password);
      if (!passCompare) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please enter correct credentials" });
      }
      //sending an auth token using jwt to the user
      const data = {
        user: {
          id: user1.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      //checking for an error in the try catch block
      success = false;
      res.status(500).json({ success, error });
    }
  }
);
//endpoint for getuser
router.post("/getuser", fetchuser, async (req, res) => {
  //
  try {
    let userId = req.user.id;
    const user1 = await user.findById(userId).select("-password");
    success = true
    res.json({success, user1});
  } catch (error) {
    //checking for an error in the try catch block
    success = false;
    res.status(500).json({ success, error });
  }
});
module.exports = router;
