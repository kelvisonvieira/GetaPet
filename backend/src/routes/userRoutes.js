const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Rota para listar todos os usuarios
router.get("/", userController.getAllUsers);

// Rota para criar uma novo usuario
router.post("/register", userController.createUser);

module.exports = router;
