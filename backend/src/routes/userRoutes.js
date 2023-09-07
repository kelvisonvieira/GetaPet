const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Rota para criar uma novo usuario
router.post("/register", userController.register);
router.post('/login',userController.login)
router.get('/checkUser',userController.checkUser)

module.exports = router;
