const express = require('express')

const jobControllers = require('../controllers/jobControllers')

const router = express.Router()

router.route('/').post(jobControllers.createNewJobController)

module.exports = router
