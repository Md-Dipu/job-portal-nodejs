const express = require('express')

const managerControllers = require('../controllers/managerControllers')
const authorization = require('../middleware/authorization')
const verifyToken = require('../middleware/verifyToken')

const router = express.Router()

router.use(verifyToken)
router.use(authorization('hiring-manager'))

router.get('/jobs', managerControllers.getJobsController)
router.get('/jobs/:id', managerControllers.getJobController)

module.exports = router
