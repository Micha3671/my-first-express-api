const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const AuthRouter = Router();

AuthRouter.get("/login", (req, res) => {
  const { username, password } = req.query;

  if (!username || !password) {
    res.status(400).send("Bad Request: Missing username or password");
    return;
  }
  res.status(200).send("User Login");
});

AuthRouter.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).send("Bad Request: Missing username, email, or password");
    return;
  }
  res.status(200).send("User Sign Up");
});

AuthRouter.delete("/logout", (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    res.status(400).send("Bad Request: Missing userId");
    return;
  }
  res.status(200).send("Logout");
});

module.exports = { AuthRouter };
