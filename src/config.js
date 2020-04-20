require('dotenv').config()

// const assert = require('assert').strict
// assert.ok(process.env.API_MONGODB_URI, 'DB connection string is missing')

const serverPort = process.env.PORT
  ? process.env.PORT
  : 8080

const serverHost = process.env.PORT
  ? process.env.API_SWAGGER_HOST
  : 'localhost:8080'

const config = {
  db_uri: process.env.API_MONGODB_URI,

  server_scheme: process.env.API_SWAGGER_SCHEME || 'http',
  server_port: serverPort,
  server_host: serverHost
}

module.exports = config
