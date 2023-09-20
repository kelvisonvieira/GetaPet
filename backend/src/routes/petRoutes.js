const router = require('express').Router()
const PetController = require('../controllers/PetController')

//middlewares
const verifyToken = require('../../helpers/verify.token')

router.post('/create', PetController.create)
module.exports = router