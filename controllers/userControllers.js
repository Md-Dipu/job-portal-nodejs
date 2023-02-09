const {
  signUpService,
  logInService,
  getUserByIdService
} = require('../services/userServices')

exports.signUpController = async (req, res) => {
  const data = req.body
  delete Object.assign(data, { role: data.accountType }).accountType
  try {
    await signUpService(data)
    res.status(200).json({
      success: true,
      message: 'User signed up successfully'
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Unable to signup user',
      error: err.message
    })
  }
}

exports.logInController = async (req, res) => {
  try {
    const user = await logInService(req.body)
    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: user
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Unable to login user',
      error: err.message
    })
  }
}

exports.getLoggedInUser = async (req, res) => {
  try {
    const user = await getUserByIdService(req.user._id)
    res.status(200).json({
      success: true,
      message: 'User found successfully',
      data: user
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Unable to find user',
      error: err.message
    })
  }
}
