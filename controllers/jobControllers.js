const {
  createNewJobService,
  updateJobByIdService
} = require('../services/jobServices')

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
