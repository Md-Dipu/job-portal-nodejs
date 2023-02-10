const Job = require('../models/Job')

/** create new job on database */
exports.createNewJobService = async (data) => {
  const job = await Job.create(data)
  return job
}
