const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const MembersRouter = Router();

let members = [
  {
    id: 1,
    firstName: "Max",
    name: "Minimann",
    birthDate: new Date("1990-10-10"),
  },
  {
    id: 2,
    firstName: "Nina",
    name: "Minimann",
    birthDate: new Date("1980-10-10"),
  },
]; // Array, um Mitglieder zu speichern

// Mitglieder hinzufügen
MembersRouter.post("/add", (req, res) => {
  const { memberId, todoId } = req.body;

  // Überprüfen, ob memberId und todoId vorhanden sind
  if (!memberId || !todoId) {
    res.status(400).send("Bad Request: Missing memberId or todoId");
    return;
  }

  // Überprüfen, ob das Mitglied bereits dem Todo hinzugefügt wurde
  const existingMember = members.find(
    (member) => member.memberId === memberId && member.todoId === todoId
  );
  if (existingMember) {
    res.status(400).send("Bad Request: Member already added to todo");
    return;
  }

  // Mitglied hinzufügen
  members.push({ memberId, todoId });
  res.status(201).send("Member successfully added to todo");
});

// Mitglieder entfernen
MembersRouter.delete("/remove", (req, res) => {
  const { memberId, todoId } = req.body;

  // Mitglied aus dem Array entfernen
  members = members.filter(
    (member) => !(member.id === memberId && member.todoId === todoId)
  );
  res.status(200).send("Member successfully removed from todo");
});

// Mitglieder auslesen
MembersRouter.get("/:memberId", (req, res) => {
  const { memberId } = req.params;

  // Mitglieder für das angegebene Todo auslesen
  const todoMembers = members.filter((member) => member.id == memberId);
  res.status(200).json(todoMembers);
});

module.exports = { MembersRouter };
