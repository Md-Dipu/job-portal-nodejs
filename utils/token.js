const jwt = require('jsonwebtoken')

exports.generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: '7days'
  })

  return token
}
