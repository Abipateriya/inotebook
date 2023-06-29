//npm i bcryptjs
//nodemon ./index.js
//jwt authentication - npm i jsonwebtoken
//express validator
const bcrypt = require("bcryptjs");
const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var fetchuser=require("../middleware/fetchUser")
const JWT_SECRET = "ABipateriya";
const router = express.Router();
//Create a user using :POST "/api/auth/createuser"
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must have a minimum of 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success=false
    const errors = validationResult(req);
    //if there are error return bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        
        return res.status(400).json({success, error: "Email already exists" });

      }
      //ye bhi promise return karta hai
      const salt = await bcrypt.genSalt(10);
      //await isliye kuki ye koi ceez promise karta hai... aur function async hai

      const secpasswd = await bcrypt.hash(req.body.password, salt);
      //create user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpasswd,
      });
      const data = {
        id: user.id,
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      // res.json(user);
      res.json({success, authtoken });
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error
        return res.status(400).json({ error: "Email already exists" });
      }
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);
//Authenticate a user using :POST "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "cannot be blank").exists(),
  ],
  async (req, res) => {
    let success=false
    const errors = validationResult(req);
    //if there are error return bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false
        return res
          .status(400)
          .json({ error: "please use correct credentials" });
      }
      const passwordComapare = await bcrypt.compare(password, user.password);
      if (!passwordComapare) {
        success=false
        return res
          .status(400)
          .json({success, error: "please use correct credentials" });
      }
      const data = {
        id: user.id,
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true
      // res.json(user);
      res.json({ success,authtoken });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);
//get logged in user  detail using :POST "/api/auth/getuser" : LOgin required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }})

module.exports = router;
