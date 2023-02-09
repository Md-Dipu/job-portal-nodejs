const colors = require('colors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const app = require('./app')

dotenv.config()

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI).then(() => {
  const port = process.env.PORT
  app.listen(port, () => {
    console.log(colors.yellow.bold('Server running on port'), port)
  })
}).catch((err) => {
  console.log(colors.red.bold('Couldn\'t able to connect database'))
  console.error(err)
})
