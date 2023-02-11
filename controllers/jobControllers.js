const {
  createNewJobService,
  updateJobByIdService,
  getJobByIdService,
  getJobsService
} = require('../services/jobServices')
const parseQuery = require('../utils/parseQuery')

exports.createNewJobController = async (req, res) => {
  try {
    const result = await createNewJobService(req.user._id, req.body)
    res.status(200).json({
      success: true,
      message: 'Job created successfully',
      data: {
        insertedId: result._id
      }
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Unable to create job',
      error: err.message
    })
  }
}

exports.updateJobByIdController = async (req, res) => {
  try {
    const job = await getJobByIdService(req.params.id)
    if (job.hiringManager.id.toString() !== req.user._id) {
      return res.status(403).json({
        success: false,
        message: 'User isn\'t authorized to modify this job'
      })
    }

    const result = await updateJobByIdService(req.params.id, req.body)
    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: result
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Unable to update job',
      error: err.message
    })
  }
}

exports.getJobByIdController = async (req, res) => {
  try {
    const job = await getJobByIdService(req.params.id)
    res.status(200).json({
      success: true,
      message: 'Job found successfully',
      data: job
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Unable to find job',
      error: err.message
    })
  }
}

exports.getJobsController = async (req, res) => {
  const { filters, queries } = parseQuery(req.query)

  try {
    console.log(filters, queries)
    const result = await getJobsService(filters, queries)
    res.status(200).json({
      success: true,
      message: 'Jobs found successfully',
      data: result.jobs,
      count: result.count
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Unable to find jobs',
      error: err.message
    })
  }
}
