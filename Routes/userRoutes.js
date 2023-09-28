const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const auth = require("../config/auth");

router.post("/user/savedata",  auth.verifyUser, async (req, res) => {
  const data = req.body;
  if (!data) {
    res.status(400).json({ msg: "Data not found", success: false });
  }
  try {
    const user = new User({
      name: data.name,
      email: data.email,
      role: data.role,
      contact: data.contact,
      age: data.age,
    });
    const savedUser = await user.save();
    res.json({ msg: "Data inserted", success: true, data: savedUser });
  } catch (e) {
    res.status(500).json({ msg: e.message, success: false });
  }
});
//api to get all users using async and await
router.get("/user/getdata", async (req, res) => {
  try{
    const users = await User.find();
    res.status(200).json({msg: "data fetched successfully", success: true, users});
  } catch (err) {
    res.status(500).json({msg: err.message, success: false});
  }
});
// api t Usero get user data by id
router.get("/users/getdata/:id", (req, res) => {
  User.findById(req.params.id)

    .then((data) => {
      res.json({ msg: "Data fetched", success: true, data });
    })
    .catch((error) => {
      res.status(500).json({ msg: error, success: false });
    });
});
// api to update user data by user id also use async await
router.put("/users/update/:id", async (req, res) => {
  const data = req.body;
  const user = await User.findById(req.params.id);
  console.log(user);
  if (!data) {
    res.status(400).json({ msg: "Data not found" });
    return;
  }
  if (!user) {
    res.status(400).json({ msg: "User not found" });
    return;
  }

  try {
    user.name = data.name ? data.name : user.name;
    user.email = data.email ? data.email : user.email;
    user.password = data.password ? data.password : user.password;
    user.role = data.role ? data.role : user.role;
    user.contactNumber = data.contactNumber
      ? data.contactNumber
      : user.contactNumber;
    const updatedUser = await user.save();
    res.json({ msg: "Data updated", success: true, updatedUser });
  } catch (error) {
    res.status(500).json({ msg: error, success: false });
  }
});

// the same api to update user data by user id also use async await but use findOneAndUpdate method
router.put("/users/updatedata/:id", async (req, res) => {
  const data = req.body;
  const user_id = req.params.id;

  if (!data) {
    return res.status(400).json({ msg: "Data not found", success: false });
  }

  try {
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ msg: "User not found", success: false });
    }

    const updatedFields = {
      name: data.name || user.name,
      email: data.email || user.email,
      password: data.password || user.password,
      role: data.role || user.role,
      contactNumber: data.contactNumber || user.contactNumber,
    };

    const updatedUser = await User.findOneAndUpdate(
      { _id: user_id },
      { $set: updatedFields },
      { new: true }
    );

    res.json({ msg: "Data updated", success: true, updatedUser });
  } catch (error) {
    res.status(500).json({ msg: error.message, success: false });
  }
});
// api to delete user data by user id

router.delete("/users/delete/:id", (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id })
    .then((data) => {
      res.json({ msg: "Data deleted", success: true, data });
    })
    .catch((error) => {
      res.status(500).json({ msg: error, success: false });
    });
});
module.exports = router;
