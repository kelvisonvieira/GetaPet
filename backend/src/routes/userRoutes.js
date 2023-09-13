const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

//middlewares
const verifyToken = require('../../helpers/verify.token')
const { imageUpload } = require('../../helpers/image-upload')

// Rota para criar uma novo usuario
router.post("/register", userController.register);
router.post('/login',userController.login)
router.get('/checkUser',userController.checkUser)
router.get('/:id', userController.getUserById)
router.patch('/edit/:id', verifyToken, imageUpload.single("image"), userController.editUser)
module.exports = router;
