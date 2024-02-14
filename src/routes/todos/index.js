const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const TodosRouter = Router();

const todos = [
  { id: 1, todo: "Staubsaugen" },
  { id: 2, todo: "Wäsche waschen" },
  { id: 3, todo: "mit Hund spazieren" },
];

// GET REQUESTS
// /v1/todos/byid
TodosRouter.get("/byid", (req, res) => {
  const todoId = req.query.todoId;
  if (!todoId) {
    res.status(400).send("Bad Request: Missing todoId");
    return;
  }
  res.status(200).send("Get Todo by id");
});

TodosRouter.post("/byuserid", (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).send("Bad Request: Missing userId");
    return;
  }
  res.status(200).send("Get Todo by user id");
});

// PUT REQUESTS
TodosRouter.put("/mark", (req, res) => {
  const { todoId } = req.body;

  if (!todoId) {
    res.status(400).send("Bad Request: Missing todoId");
    return;
  }
  res.status(200).send("Todo als erledigt markieren");
});

TodosRouter.put("/update", (req, res) => {
  const { todoId, updatedText } = req.body;

  if (!todoId || !updatedText) {
    res.status(400).send("Bad Request: Missing todoId or updatedText");
    return;
  }
  res.status(200).send("Todo aktualisieren");
});

// POST REQUESTS
TodosRouter.post("/create", (req, res) => {
  const { todoName } = req.body;

  if (!todoName) {
    res.status(400).send("Bad Request: Missing todoName");
    return;
  }
  res.status(201).send("Todo erfolgreich erstellt");
});

// DELETE REQUEST
TodosRouter.delete("/delete", (req, res) => {
  const { todoId } = req.body;

  if (!todoId) {
    res.status(400).send("Bad Request: Missing todoId");
    return;
  }
  res.status(200).send("Todo erfolgreich gelöscht");
});

module.exports = { TodosRouter };
