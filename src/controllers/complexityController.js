const dataService = require('../services/dataService')
const lexicalService = require('../services/lexicalService')

// path: /api/complexity
exports.post = async (req, res) => {
  const isVerbose = (req.query && req.query.mode === 'verbose')
  const input = req.body.input
  try {
    lexicalService.validate(input)
  } catch (ex) {
    return res.status(400).json(ex.message)
  }

  try {
    const nonLexicals = await dataService.getNonLexicals()
    const data = (isVerbose)
      ? lexicalService.getRatioVerbose(input, nonLexicals)
      : lexicalService.getRatio(input, nonLexicals)

    return res.status(200).json({ data })
  } catch (ex) {
    return res.status(500).json(ex.message)
  }
}
