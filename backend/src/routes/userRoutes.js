const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Rota para listar todas as tarefas
router.get("/", userController.getAllUsers);

// Rota para criar uma nova tarefa
router.post("/register", userController.createUser);

module.exports = router;
