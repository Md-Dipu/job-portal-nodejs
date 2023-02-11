const express = require('express')

const jobControllers = require('../controllers/jobControllers')
const authorization = require('../middleware/authorization')
const verifyToken = require('../middleware/verifyToken')

const router = express.Router()

router.route('/')
  .post(
    verifyToken,
    authorization('hiring-manager'),
    jobControllers.createNewJobController
  )
  .get(jobControllers.getJobsController)

router.route('/:id')
  .patch(
    verifyToken,
    authorization('hiring-manager'),
    jobControllers.updateJobByIdController
  )
  .get(jobControllers.getJobByIdController)

module.exports = router
