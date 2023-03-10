const cors = require('cors')
const express = require('express')

const jobRoutes = require('./routes/jobRouters')
const managerRoutes = require('./routes/managerRoute')
const userRoutes = require('./routes/userRoutes')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/jobs', jobRoutes)
app.use('/manager', managerRoutes)
app.use('/user', userRoutes)

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Running job-portal-assignment server'
  })
})

app.get('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

module.exports = app
