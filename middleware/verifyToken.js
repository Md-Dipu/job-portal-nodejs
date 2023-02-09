const jwt = require('jsonwebtoken')
const { promisify } = require('node:util')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1]
    if (!token) {
      throw new Error('User isn\'t logged in')
    }

    const verify = promisify(jwt.verify)
    const decoded = await verify(token, process.env.TOKEN_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({
      success: false,
      message: 'User is unauthorized',
      error: err.message
    })
  }
}
