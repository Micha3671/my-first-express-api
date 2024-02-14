const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");

const TodosRouter = Router();

const todos = [
  { id: 1, task: "Einkaufen", completed: false },
  { id: 2, task: "Staubsaugen", completed: true },
  { id: 3, task: "mit Hund spazieren", completed: false },
];

// Update Todo
TodosRouter.put("/update", (req, res) => {
  const { id, newText } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex].text = newText;
    res.status(StatusCodes.OK).send("Todo erfolgreich aktualisiert.");
  } else {
    res.status(StatusCodes.NOT_FOUND).send("Todo nicht gefunden.");
  }
});

// Todo erledigt markieren
TodosRouter.put("/mark", (req, res) => {
  const { id } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex].completed = true;
    res.status(StatusCodes.OK).send("Todo erfolgreich als erledigt markiert.");
  } else {
    res.status(StatusCodes.NOT_FOUND).send("Todo nicht gefunden.");
  }
});

// Todo erstellen
TodosRouter.post("/create", (req, res) => {
  const { text } = req.body;
  const newTodo = {
    id: todos.length + 1,
    text,
    completed: false,
  };
  todos.push(newTodo);
  res.status(StatusCodes.CREATED).send("Todo erfolgreich erstellt.");
});

// Todo löschen
TodosRouter.delete("/delete", (req, res) => {
  const { id } = req.body;
  todos = todos.filter((todo) => todo.id !== id);
  res.status(StatusCodes.OK).send("Todo erfolgreich gelöscht.");
});

// Einzelnes Todo zurückgeben
TodosRouter.get("/byid", (req, res) => {
  const { id } = req.query;
  const todo = todos.find((todo) => todo.id === parseInt(id));
  if (todo) {
    res.status(StatusCodes.OK).json(todo);
  } else {
    res.status(StatusCodes.NOT_FOUND).send("Todo nicht gefunden.");
  }
});

// Alle Todos von einem Benutzer zurückgeben
TodosRouter.get("/byuserid", (req, res) => {
  const { userId } = req.query; // Annahme: userId ist im Request enthalten
  const userTodos = todos.filter((todo) => todo.userId === parseInt(userId));
  res.status(StatusCodes.OK).json(userTodos);
});

module.exports = { TodosRouter };
