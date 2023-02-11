const { getJobsService } = require('../services/jobServices')
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
