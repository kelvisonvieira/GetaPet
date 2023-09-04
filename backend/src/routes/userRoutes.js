const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Rota para criar uma novo usuario
router.post("/register", userController.register);

module.exports = router;
