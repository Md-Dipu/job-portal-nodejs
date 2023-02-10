const express = require('express')

const userControllers = require('../controllers/userControllers')
const verifyToken = require('../middleware/verifyToken')

const router = express.Router()

router.post('/signup', userControllers.signUpController)
router.post('/login', userControllers.logInController)
router.get('/me', verifyToken, userControllers.getLoggedInUser)

module.exports = router
