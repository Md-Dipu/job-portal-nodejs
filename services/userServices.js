const bcrypt = require('bcryptjs')
const validator = require('validator')

const User = require('../models/User')
const { generateToken } = require('../utils/token')

/** Create new user */
exports.signUpService = async (data) => {
  const user = await User.create(data)
  return user
}

/** Login user */
exports.logInService = async (data) => {
  // checking email and password provided or not
  if (!(validator.isEmail(data.email) && data.password)) {
    throw new Error('Provide valid information')
  }

  // finding user by email
  const user = await User.findOne({ email: data.email })
  if (!user) {
    throw new Error('User account not found')
  }

  // matching provided password and user password hash
  const isPasswordMatched = bcrypt.compareSync(data.password, user.password)
  if (!isPasswordMatched) {
    throw new Error('Email or password is not correct')
  }

  // checking user status active or not
  if (user.status !== 'active') {
    throw new Error('User account isn\'t active currently')
  }

  // generating jwt token
  const token = generateToken({
    _id: user._id,
    role: user.role
  })

  const result = user.toObject()
  delete Object.assign(result, { token }).password
  return result
}
