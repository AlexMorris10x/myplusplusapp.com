const express = require("express");
const router = express.Router();
const PROJECT = require("../db/project");

router.get("/getProject", (req, res, next) => {
  PROJECT.find()
    .then(data => res.json(data))
    .catch(next);
});

router.post("/addProject", (req, res) => {
  const { username, text } = req.body;
  const newProject = new PROJECT({
    username: username,
    text: text
  });

  newProject.save((err, savedProject) => {
    if (err) return res.json(err);
    return res.json(savedProject);
  });
});

router.delete("/deleteProject/:id", (req, res, next) => {
  PROJECT.findOneAndRemove({ _id: req.params.id })
    .then(data => res.json(data))
    .catch(next);
});

router.delete("/moveProjectDelete/:username", (req, res, next) => {
  PROJECT.deleteMany({ username: req.params.username })
    .then(data => res.json(data))
    .catch(next);
});

router.put("/moveProjectAdd/:username", (req, res, next) => {
  const username = req.body;
  PROJECT.insertMany(username)
    .then(data => res.json(data))
    .catch(next);
});

module.exports = router;
