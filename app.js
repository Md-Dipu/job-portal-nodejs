const cors = require('cors')
const express = require('express')

const app = express()

app.use(express.json())
app.use(cors())

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
