const { signUpService } = require('../services/userServices')

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
