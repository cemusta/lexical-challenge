const winston = require('winston')

const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
  transports: [consoleTransport]
}
// eslint-disable-next-line new-cap
const logger = new winston.createLogger(myWinstonOptions)

module.exports = function (app) {
  function logRequest (req, res, next) {
    logger.info(req.url)
    next()
  }
  app.use(logRequest)

  function logError (err, req, res, next) {
    logger.error(err)
    next()
  }
  app.use(logError)
}

module.exports.logger = logger
