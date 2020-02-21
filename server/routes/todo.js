const express = require("express");
const router = express.Router();
const TODO = require("../db/todo");

router.get("/getTodo", (req, res, next) => {
  // if (req.user.username === undefined) {
  //   return res.json({ status: 404 });
  // } else {
  TODO.find({ username: req.user.username })
    .then(data => res.json(data))
    .catch(next);
  // }
});

router.post("/addTodo", (req, res) => {
  const {
    username,
    text,
    projectId,
    projectName,
    complete,
    completeDate,
    order
  } = req.body;

  const newTODO = new TODO({
    username: username,
    text: text,
    projectId: projectId,
    projectName: projectName,
    complete: complete,
    completeDate: completeDate,
    order: order
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

router.put("/updateOrder/:newId", (req, res, next) => {
  if (req.params.newId === "undefined") {
    return res.json({ status: 200 });
  } else {
    const orderVal = req.body.orderVal;
    TODO.findOneAndUpdate(
      { _id: req.params.newId },
      { $set: { order: orderVal } }
    )
      .then(data => res.json(data))
      .catch(next);
  }
});

router.put("/movedTodo", (req, res, next) => {
  const movedTodoId = req.body.movedTodoId;
  const movedTodoOrder = req.body.movedTodoOrder;
  if (movedTodoId === undefined) {
    return res.json({ status: 200 });
  } else {
    TODO.findOneAndUpdate(
      { _id: movedTodoId },
      { $set: { order: movedTodoOrder } }
    )
      .then(data => res.json(data))
      .catch(next);
  }
});

router.put("/sourceTodo", (req, res, next) => {
  const sourceTodoId = req.body.sourceTodoId;
  const sourceTodoOrder = req.body.sourceTodoOrder;
  if (sourceTodoId === undefined) {
    return res.json({ status: 200 });
  } else {
    TODO.findOneAndUpdate(
      { _id: sourceTodoId },
      { $set: { order: sourceTodoOrder } }
    )
      .then(data => res.json(data))
      .catch(next);
  }
});

router.put("/destinationTodo", (req, res, next) => {
  const destinationTodoId = req.body.destinationTodoId;
  const destinationTodoOrder = req.body.destinationTodoOrder;
  if (destinationTodoId === undefined) {
    return res.json({ status: 200 });
  } else {
    TODO.findOneAndUpdate(
      { _id: destinationTodoId },
      { $set: { order: destinationTodoOrder } }
    )
      .then(data => res.json(data))
      .catch(next);
  }
});

module.exports = router;
