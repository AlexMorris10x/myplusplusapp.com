const express = require("express");
const router = express.Router();
const PROJECT = require("../db/project");
const TODO = require("../db/todo");

router.get("/getProject", (req, res, next) => {
  if (req.user.username === undefined) {
    return res.json({ status: 404 });
  } else {
    PROJECT.find({ username: req.user.username })
      .then(data => res.json(data))
      .catch(next);
  }
});

router.post("/addProject", (req, res) => {
  const { username, text, order } = req.body;
  const newProject = new PROJECT({
    username: username,
    text: text,
    order: order
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

router.delete("/deleteTodos/:id", (req, res, next) => {
  PROJECT.findOneAndRemove({ _id: req.params.id });
  TODO.deleteMany({ projectId: req.params.id })
    .then(data => res.json(data))
    .catch(next);
});

router.put("/movedProject", (req, res, next) => {
  const movedProjectId = req.body.movedProjectId;
  const movedProjectOrder = req.body.movedProjectOrder;
  if (movedProjectId === undefined) {
    return res.json({ status: 200 });
  } else {
    PROJECT.findOneAndUpdate(
      { _id: movedProjectId },
      { $set: { order: movedProjectOrder } }
    )
      .then(data => res.json(data))
      .catch(next);
  }
});

router.put("/sourceProject", (req, res, next) => {
  const sourceProjectId = req.body.sourceProjectId;
  const sourceProjectOrder = req.body.sourceProjectOrder;
  if (sourceProjectId === undefined) {
    return res.json({ status: 200 });
  } else {
    PROJECT.findOneAndUpdate(
      { _id: sourceProjectId },
      { $set: { order: sourceProjectOrder } }
    )
      .then(data => res.json(data))
      .catch(next);
  }
});

router.put("/destinationProject", (req, res, next) => {
  const destinationProjectId = req.body.destinationProjectId;
  const destinationProjectOrder = req.body.destinationProjectOrder;
  if (destinationProjectId === undefined) {
    return res.json({ status: 200 });
  } else {
    PROJECT.findOneAndUpdate(
      { _id: destinationProjectId },
      { $set: { order: destinationProjectOrder } }
    )
      .then(data => res.json(data))
      .catch(next);
  }
});

module.exports = router;
