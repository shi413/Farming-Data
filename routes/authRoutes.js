const express = require("express");
const { register, login, logout } = require("../controllers/authController");

const Authroute = express.Router();

Authroute.post("/register", register);
Authroute.post("/login", login);
Authroute.post("/logout", logout);

module.exports = Authroute;
