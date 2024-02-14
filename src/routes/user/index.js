const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

// Datenbank simulieren
let profiles = [
  {
    id: 1,
    firstName: "Max",
    name: "Mustermann",
    birthDate: new Date("1990-10-10"),
  },
  {
    id: 2,
    firstName: "Nina",
    name: "Mustermann",
    birthDate: new Date("1980-10-10"),
  },
];

const UserRouter = Router();

//  ***GET REQUESTS***
// Return profile from a specific user
UserRouter.get("/profile", (req, res) => {
  const userId = parseInt(req.query.userId);
  if (!userId) {
    res.status(400).send("Bad Request: Missing userId");
    return;
  }
  const userProfile = profiles.find((item) => item.id === userId);
  if (!userProfile) {
    res.status(404).send("Not Found: User not found");
    return;
  }
  res.status(200).json({ profile: userProfile });
});

//  ***PUT REQUESTS***
UserRouter.put("/profile/update", (req, res) => {
  const { username, userId } = req.body;

  const currentUser = profiles.find((item) => item.id === userId);
  if (!currentUser) {
    res.status(404).send("Not Found: User not found");
    return;
  }
  currentUser.username = username;

  res.status(200).json({ updatedProfile: currentUser });
});

//  ***DELETE REQUESTS***
UserRouter.delete("/profile", (req, res) => {
  const { userId } = req.body;

  const deletedProfile = profiles.find((item) => item.id === userId);
  if (!deletedProfile) {
    res.status(404).send("Not Found: User not found");
    return;
  }

  profiles = profiles.filter((item) => item.id !== userId);
  res.status(200).json({ deletedUserId: userId });
});

module.exports = { UserRouter };
