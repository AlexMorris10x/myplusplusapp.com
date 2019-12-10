const express = require("express");
const router = express.Router();
const PROJECT = require("../db/models/project");

router.post("/", (req, res) => {
  const { username, value } = req.body;
  const newPROJECT = new PROJECT({
    username: username,
    value: value
  });
  newPROJECT.save((err, savedPROJECT) => {
    if (err) return res.json(err);
    return res.json(savedPROJECT);
  });
});

router.get("/", (req, res, next) => {
  PROJECT.find()
    .then(data => res.json(data))
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  PROJECT.findOneAndRemove({ _id: req.params.id })
    .then(data => res.json(data))
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  const { value } = req.body;
  PROJECT.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { value: value, updated: Date.now() } }
  )
    .then(data => res.json(data))
    .catch(next);
});

module.exports = router;
