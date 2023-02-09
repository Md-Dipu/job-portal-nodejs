module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: 'User isn\'t unauthorized to access the route'
      })
    }

    next()
  }
}
