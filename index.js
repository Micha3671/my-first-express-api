const express = require("express");
const cors = require("cors");

// Zugriff auf Umgebungsvariablen
const { PORT } = process.env;

// Initialisierung von express
const app = express();
// Use for development
app.use(cors());

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

app.get("/todos", (req, res) => {
  const todos = [
    { id: 1, task: "Einkaufen", completed: false },
    { id: 2, task: "Staubsaugen", completed: true },
    { id: 3, task: "mit Hund spazieren", completed: false },
  ];

  const formattedTodos = todos
    .map(
      (todo) =>
        `- ${todo.task} (${todo.completed ? "Erledigt" : "Nicht erledigt"})`
    )
    .join("\n");
  res.json({ todos: formattedTodos });
});

// App hört im folgenden auf den Port, welcher über die Umgebungsvariable definiert ist
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
