const express = require("express");
const router = express.Router();
const TODO = require("../db/models/todo");

router.get("/getTodo", (req, res, next) => {
  TODO.find()
    .then(data => res.json(data))
    .catch(next);
});

router.post("/addTodo", (req, res) => {
  console.log(req.body);
  const { username, value, project, complete, completeDate } = req.body;
  const newTODO = new TODO({
    username: username,
    value: value,
    project: project,
    complete: complete,
    completeDate: completeDate
  });

  newTODO.save((err, savedTODO) => {
    if (err) return res.json(err);
    return res.json(savedTODO);
  });
});

router.delete("/deleteTodo/:id", (req, res, next) => {
  TODO.findOneAndRemove({ _id: req.params.id })
    .then(data => res.json(data))
    .catch(next);
});

router.put("/completeTodo/:id", (req, res, next) => {
  console.log("first run");
  const complete = req.body.complete;
  const completeDate = req.body.completeDate;
  TODO.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { complete: complete } },
    { $set: { completeDate: completeDate } }
  )
    .then(data => res.json(data))
    .catch(next);
});

router.put("/moveTodoDelete/:project", (req, res, next) => {
  console.log("movedTod");
  // const todos = req.body;
  TODO.deleteMany({ project: req.params.project })
    .then(data => res.json(data))
    .catch(next);
  // TODO.insertMany(todos)
  //   .then(data => res.json(data))
  //   .catch(next);
});

router.put("/moveTodoAdd/:project", (req, res, next) => {
  console.log("movedTod");
  const todos = req.body;
  // TODO.deleteMany({ project: req.params.project })
  //   .exec()
  //   .catch(next);
  TODO.insertMany(todos)
    .then(data => res.json(data))
    .catch(next);
});

module.exports = router;
