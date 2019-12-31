const express = require("express");
const router = express.Router();
const TODO = require("../db/models/todo");

router.post("/", (req, res) => {
  const { username, value, project, complete } = req.body;
  const newTODO = new TODO({
    username: username,
    value: value,
    project: project,
    complete: complete
  });

  newTODO.save((err, savedTODO) => {
    if (err) return res.json(err);
    return res.json(savedTODO);
  });
});

router.get("/", (req, res, next) => {
  TODO.find()
    .then(data => res.json(data))
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  TODO.findOneAndRemove({ _id: req.params.id })
    .then(data => res.json(data))
    .catch(next);
});

router.put("/completeTodo/:id", (req, res, next) => {
  console.log("first run");
  const complete = req.body.complete;
  TODO.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { complete: complete } }
  )
    .then(data => res.json(data))
    .catch(next);
});

router.put("/moveTodo/:username", (req, res, next) => {
  console.log("second run", req.params.id);
});

module.exports = router;
