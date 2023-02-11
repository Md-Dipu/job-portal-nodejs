const Application = require('../models/Applications')
const Job = require('../models/Job')
const User = require('../models/User')

exports.applyJobService = async (jobId, userId, data) => {
  const job = await Job.findById(jobId)
  if (new Date(job.deadline).getTime() < Date.now()) {
    throw Error('Apply deadline is over')
  }

  const user = await User.findById(userId)
  const application = await Application.create({
    candidate: {
      id: user._id,
      name: user.name,
      email: user.email,
      contactNumber: user.contactNumber
    },
    job: {
      id: job._id,
      title: job.title,
      location: job.location,
      hiringManager: job.hiringManager
    },
    ...data
  })

  return application
}
