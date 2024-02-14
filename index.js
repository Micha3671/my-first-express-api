const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Zugriff auf Umgebungsvariablen
const { PORT } = process.env;

// Initialisierung von express
const app = express();
app.use(bodyParser.json());
// Use for development
app.use(cors());

//http-status-codes einfügen
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.get("/profile", (req, res) => {
  res.json({ profile: { name: "Max" } });
});

app.get("/user", (req, res) => {
  const userData = {
    firstName: "Ernst",
    lastName: "Witzig",
    address: "Hauptstrasse 100, 50000 Köln",
    hobbies: ["Lesen", "Reisen"],
  };
  res.json(userData);
});

let todos = [
  { id: 1, task: "Einkaufen", completed: false },
  { id: 2, task: "Staubsaugen", completed: true },
  { id: 3, task: "mit Hund spazieren", completed: false },
];

// Get all Todos
app.get("/todos", (req, res) => {
  res.json({ todos });
});

// Return todo with a specific id
app.get("/todo", (req, res) => {
  const todoId = parseInt(req.query.todoId);
  if (!todoId) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const todo = todos.find((item) => item.id === todoId);
  res.status(StatusCodes.OK).json({ todo });
  res.json({ todo });
});

//  ***POST REQUESTS***
app.post("/todo", (req, res) => {
  const newTodo = req.body;

  todos.push(newTodo);

  res.json({ newTodo });
});

//  ***PUT REQUESTS***
app.put("/todo/addTodo", (req, res) => {
  const { todoname, todoId } = req.body.todo;

  const currentTodo = todos.find((item) => item.id === todoId);
  currentTodo.todoname = todoname;

  const deletedTodos = todos.filter((item) => item.id !== todoId);
  deletedTodos.push(currentTodo);

  todos = deletedTodos;

  res.json({ updatedTodo: currentTodo });
});

//  ***DELETE REQUESTS***
app.delete("/todo", (req, res) => {
  const { todoId } = req.body;

  const deletedTodos = todos.filter((item) => item.id !== todoId);
  deletedTodos = deletedTodos;

  res.json({ deletedTodoId: todoId });
});

// App hört im folgenden auf den Port, welcher über die Umgebungsvariable definiert ist
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
