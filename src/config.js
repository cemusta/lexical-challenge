require('dotenv').config()

const serverPort = process.env.PORT
  ? process.env.PORT
  : 8080

const serverHost = process.env.PORT
  ? process.env.SWAGGER_HOST
  : 'localhost:8080'

const config = {
  db_uri: process.env.MONGODB_URI,

  server_scheme: process.env.SWAGGER_SCHEME || 'http',
  server_port: serverPort,
  server_host: serverHost
}

module.exports = config
