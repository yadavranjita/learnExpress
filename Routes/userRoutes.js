const express = require("express");
const router = express.Router();
const User = require("../models/userModels");

router.post("/savedata", (req, res) => {
  const data = req.body;
  console.log(data);

  const user = new User({
    name: data.name,
    email: data.email,
    role: data.role,
    contact: data.contact,
    age: data.age,
  });
  user.save((error, registeredUser) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send(registeredUser);
    }
  });
});

module.exports = router;