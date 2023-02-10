const mongoose = require('mongoose')

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
      trim: true
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    jobType: {
      type: String,
      required: [true, 'Job type is required'],
      trim: true
    },
    salaryRange: {
      from: {
        type: Number,
        required: [true, 'Staring salary is required'],
        min: 0
      },
      to: {
        type: Number,
        min: 0
      }
    },
    hiringManager: {
      id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
      },
      name: String,
      email: String,
      contactNumber: String
    },
    deadline: {
      type: Date,
      required: [true, 'Deadline is required']
    }
  },
  {
    timestamps: true
  }
)

jobSchema.pre('save', function (next) {
  // checking is salary range modified or not
  if (!this.isModified('salaryRange')) {
    next()
  }

  // checking is salary range valid or not
  if (this.salaryRange?.to && (this.salaryRange.from < this.salaryRange.to)) {
    throw new Error('Salary range isn\'t valid')
  }

  next()
})

const Job = mongoose.model('Job', jobSchema)

module.exports = Job
