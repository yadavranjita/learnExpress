const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// router for register
router.post("/users/register", (req, res) => {
  const email = req.body.email;
  try {
    User.findOne({ email: email }).then((user_email) => {
      if (user_email != null) {
        res.status(400).json({ msg: "email already exists", success: false });
        return;
      } else {
        const password = req.body.password;
        bcryptjs.hash(password, 10, (e, hashed_pw) => {
          if (e) {
            res.status(500).json({ msg: e, success: false });
            return;
          } else {
            const data = new User({
              email: email,
              password: hashed_pw,
            });
            data.save().then((data) => {
              res.json({
                msg: "user registered successfully",
                success: true,
                data,
              });
            });
          }
        });
      }
    });
  } catch (e) {
    res.status(500).json({ msg: e, success: false });
  }
});
//login
router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(400)
        .json({ msg: "email or password is not correct", success: false });
      return;
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      res
        .status(400)
        .json({ msg: "email or password is not correct", success: false });
      return;
    }

    const token = jwt.sign({ _id: user._id }, "neosphere", {
      expiresIn: "30d",
    });

    res.status(200).json({ msg: "login successful", success: true, token,  user });
  } catch (e) {
    res.status(500).json({ msg: e, success: false });
  }
});

// router for register by name
router.post("/users/registername", (req, res) => {
  const name = req.body.name;
  try {
    User.findOne({ name: name }).then((user_name) => {
      if (user_name != null) {
        res.status(400).json({ msg: "name already exists", success: false });
        return;
      } else {
        const password = req.body.password;
        bcryptjs.hash(password, 10, (e, hashed_pw) => {
          if (e) {
            res.status(500).json({ msg: e, success: false });
            return;
          } else {
            const data = new User({
              name: name,
              password: hashed_pw,
            });
            data.save().then((data) => {
              res.json({
                msg: "user registered successfully",
                success: true,
                data,
              });
            });
          }
        });
      }
    });
  } catch (e) {
    res.status(500).json({ msg: e, success: false });
  }
});

module.exports = router;