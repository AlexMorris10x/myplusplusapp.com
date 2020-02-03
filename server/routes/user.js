const express = require("express");
const router = express.Router();
const User = require("../db/user");
const passport = require("../passport");

router.get("/user", (req, res, next) => {
  if (req.user) {
    return res.json({ user: req.user });
  } else {
    return res.json({ user: null });
  }
});

router.post(
  "/login",
  (req, res, next) => {
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    const user = JSON.parse(JSON.stringify(req.user));
    const cleanUser = Object.assign({}, user);
    if (cleanUser) {
      delete cleanUser.password;
    }
    res.json({ user: cleanUser });
  }
);

router.post("/logout", (req, res) => {
  if (req.user) {
    req.session.destroy();
    res.clearCookie("connect.sid");
    return res.json({ msg: "logging you out" });
  } else {
    return res.json({ msg: "no user to log out!" });
  }
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }, (err, userMatch) => {
    if (userMatch) {
      return res.json({
        error: `Sorry, already a user with the username: ${username}`
      });
    }
    const newUser = new User({
      username: username,
      password: password
    });
    newUser.save((err, savedUser) => {
      if (err) return res.json(err);
      return res.json(savedUser);
    });
  });
});

module.exports = router;
