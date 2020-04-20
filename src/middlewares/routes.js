
module.exports = function (app) {
  app.use('/api/complexity', require('../routers/complexityRouter'))
}
