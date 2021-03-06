const express = require('express')
const error = require('./middleware/error')
const logger = require('./config/logger')

const app = express()
require('./startup/errorHandling')()
require('./startup/config')

require('./startup/routes')(app)
require('./startup/db')()

app.use(error)


const port = process.env.PORT || 3000
const server = app.listen(port, logger.info(`listening on port ${port}`))

module.exports = server