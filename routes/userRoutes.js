const express = require('express')

const userController = require('../controllers/userControllers')
const verifyToken = require('../middleware/verifyToken')

const router = express.Router()

router.post('/signup', userController.signUpController)
router.post('/login', userController.logInController)
router.get('/me', verifyToken, userController.getLoggedInUser)

module.exports = router
