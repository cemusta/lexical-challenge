const dataService = require('../services/dataService')

// path: /api/dictionary
exports.get = async (req, res) => {
  try {
    const nonLexicals = await dataService.getNonLexicals()

    return res.status(200).json({ length: nonLexicals.length, data: nonLexicals })
  } catch (ex) {
    return res.status(500).json(ex.message)
  }
}

// path: /api/dictionary/token
exports.postToken = async (req, res) => {
  try {
    const nonLexicals = await dataService.getNonLexicals()
    return res.status(200).json({ length: nonLexicals.length, data: nonLexicals })
  } catch (ex) {
    return res.status(500).json(ex.message)
  }
}
