const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      unique: true,
      validate: [validator.isEmail, 'Provide a valid email']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      validate: {
        validator: value => validator.isStrongPassword(value, {
          minLength: 6
        }),
        message: 'Password {VALUE} is not strong enough'
      }
    },
    role: {
      type: String,
      enum: ['candidate', 'hiring-manager', 'admin'],
      default: 'candidate'
    },
    contactNumber: {
      type: String,
      validate: [validator.isMobilePhone, 'Provide a valid contact number']
    },
    shippingAddress: String,
    imageURL: {
      type: String,
      validate: [validator.isURL, 'Provide a valid url']
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'blocked'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    next()
  }

  this.password = bcrypt.hashSync(this.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
