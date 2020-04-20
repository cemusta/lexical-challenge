const dataService = require('../services/dataService')
const lexicalService = require('../services/lexicalService')

// path: /api/complexity
exports.post = async (req, res) => {
  const input = req.body.input
  try {
    lexicalService.validate(input)
  } catch (ex) {
    return res.status(400).json(ex.message)
  }

  try {
    const nonLexicals = dataService.getNonLexicals()
    const data = lexicalService.getRatio(input, nonLexicals)
    return res.status(200).json({ data })
  } catch (ex) {
    return res.status(500).json(ex.message)
  }
}
