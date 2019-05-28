const express = require("express");
const router = express.Router();
const userService = require("../services/user_service");

// routes
router.post("/authenticate", authenticate);
router.post("/register", register);
router.get("/listall", listAll);

module.exports = router;

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch((err) => next(err));
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function listAll(req, res, next) {
  userService
    .listAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
}
