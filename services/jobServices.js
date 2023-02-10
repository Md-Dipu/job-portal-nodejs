const Job = require('../models/Job')

/** create new job on database */
exports.createNewJobService = async (data) => {
  const job = await Job.create(data)
  return job
}

/** update job data */
exports.updateJobByIdService = async (id, data) => {
  const result = await Job.updateOne({ _id: id }, data, { runValidators: true })
  return result
}
