const assert = require('assert').strict
const dataService = require('../services/dataService')

// get: /api/dictionary
exports.list = async (req, res) => {
  try {
    const nonLexicals = await dataService.getNonLexicalsRaw()

    return res.status(200).json({ length: nonLexicals.length, data: nonLexicals })
  } catch (ex) {
    return res.status(500).json(ex.message)
  }
}

// get: /api/dictionary/{token}
exports.get = async (req, res) => {
  try {
    assert.ok(req.params.token, 'token missing')
  } catch (ex) {
    return res.status(400).json(ex.message)
  }

  try {
    const token = req.params.token
    const data = await dataService.getToken(token)
    if (data) {
      return res.status(200).json({ data })
    }

    return res.status(404).json({ data: null })
  } catch (ex) {
    return res.status(500).json(ex.message)
  }
}

// post: /api/dictionary/{token}
exports.post = async (req, res) => {
  try {
    assert.ok(req.params.token, 'token missing')
  } catch (ex) {
    return res.status(400).json(ex.message)
  }

  try {
    const token = req.params.token
    await dataService.addToken(token)
    return res.status(200).json({ })
  } catch (ex) {
    return res.status(500).json(ex.message)
  }
}

// delete: /api/dictionary/{token}
exports.delete = async (req, res) => {
  try {
    assert.ok(req.params.token, 'token missing')
  } catch (ex) {
    return res.status(400).json(ex.message)
  }

  try {
    const token = req.params.token
    await dataService.deleteToken(token)
    return res.status(200).json({ })
  } catch (ex) {
    return res.status(500).json(ex.message)
  }
}
