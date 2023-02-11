const {
  getApplicationsByJobId
} = require('../services/applicationServices')
const {
  getJobsService,
  getJobByIdService
} = require('../services/jobServices')
const parseQuery = require('../utils/parseQuery')

exports.getJobsController = async (req, res) => {
  const { filters, queries } = parseQuery(req.query)
  filters['hiringManager.id'] = req.user._id

  try {
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

exports.getJobController = async (req, res) => {
  try {
    const job = await getJobByIdService(req.params.id)
    if (job.hiringManager.id.toString() !== req.user._id) {
      return res.status(403).json({
        success: false,
        message: 'User isn\'t authorized to get this job'
      })
    }

    const result = await getApplicationsByJobId(job._id)

    res.status(200).json({
      success: true,
      message: 'Jobs found successfully',
      data: job,
      applications: result.applications,
      applicationsCount: result.count
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Unable to find jobs',
      error: err.message
    })
  }
}
