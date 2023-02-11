const Job = require('../models/Job')
const { getUserByIdService } = require('./userServices')

/** create new job on database */
exports.createNewJobService = async (hiringManagerId, data) => {
  const user = await getUserByIdService(hiringManagerId)
  data.hiringManager = {
    id: user._id,
    name: user.name,
    email: user.email,
    contactNumber: user.contactNumber
  }

  console.log(data)
  const job = await Job.create(data)
  return job
}

/** update job data */
exports.updateJobByIdService = async (id, data) => {
  const result = await Job.updateOne({ _id: id }, data, { runValidators: true })
  return result
}

/** get job by id */
exports.getJobById = async (id) => {
  const job = await Job.findById(id)
  return job
}
