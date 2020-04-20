
module.exports = function (app) {
  app.use('/api/complexity', require('../routers/complexityRouter'))
  app.use('/api/dictionary', require('../routers/dictionaryRouter'))
}
