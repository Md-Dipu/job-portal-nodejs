const User = require('../models/User')

/** Create new user */
exports.signUpService = async (data) => {
  const user = await User.create(data)
  return user
}
