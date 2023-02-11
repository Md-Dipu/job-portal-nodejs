const mongoose = require('mongoose')
const validator = require('validator')

const applicationSchema = mongoose.Schema(
  {
    candidate: {
      id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
      },
      name: {
        type: String,
        trim: true
      },
      email: {
        type: String,
        validate: [validator.isEmail, 'Provide a valid email address']
      },
      contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, 'Provide a valid contact number']
      }
    },
    job: {
      id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'Job'
      },
      title: {
        type: String,
        trim: true
      },
      location: {
        type: String,
        trim: true
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
      }
    },
    resumeUrl: {
      type: String,
      required: true,
      validate: [validator.isURL, 'Provide a valid url']
    }
  },
  {
    timestamps: true
  }
)

const Application = mongoose.model('Application', applicationSchema)

module.exports = Application
