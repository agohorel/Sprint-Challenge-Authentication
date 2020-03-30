require("dotenv").config();

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require("./auth-model.js");
const generateToken = require("./generateToken.js");

router.post("/register", async (req, res) => {
  let { username, password } = req.body;
  try {
    const hashed = bcrypt.hashSync(password, 12);
    password = hashed;
    const newUser = await db.insert({ username, password });
    const token = generateToken(newUser);
    res.status(201).json({ id: newUser.id, username: newUser.username, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.findBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ msg: `welcome, ${user.username}!`, token });
    } else {
      res.status(401).json({ msg: "invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
