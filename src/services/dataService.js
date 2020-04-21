const config = require('../config')
const logger = require('../middlewares/logger').logger

const defaults = require('../constants/nonLexical')
const MongoClient = require('mongodb').MongoClient

let mongodb = null

const initialize = async () => {
  try {
    if (!config.db_uri) {
      logger.warn('no mongodb uri defined, using fallback file as defaults')
      return
    }

    mongodb = await MongoClient.connect(config.db_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    await seedData()

    logger.info('db connection initialized.')
  } catch (ex) {
    logger.error('db connection problem: ', ex)
    throw ex
  }
}

const seedData = async () => {
  const coll = mongodb.db('lexical').collection('nonLexicals')
  const nonLexicals = await coll.find().toArray()

  if (nonLexicals && nonLexicals.length > 0) {
    return
  }

  coll.createIndex({ data: 1 }, { unique: true })

  logger.info('db empty, starting seeding from default file...')

  const date = new Date()

  let bulkUpdateOps = []
  const entries = defaults.map(x => ({ data: x, date }))
  entries.forEach(async doc => {
    bulkUpdateOps.push({ insertOne: { document: doc } })

    if (bulkUpdateOps.length === 1000) {
      await coll.bulkWrite(bulkUpdateOps)
      bulkUpdateOps = []
    }
  })

  if (bulkUpdateOps.length > 0) {
    const result = await coll.bulkWrite(bulkUpdateOps)
    logger.info('db seeding done.')
    return result
  }
}

const getNonLexicals = async () => {
  try {
    if (!mongodb) {
      return defaults
    }

    const coll = mongodb.db('lexical').collection('nonLexicals')
    const data = await coll.find({ }).toArray()
    const result = data.map(x => x.data)

    return result
  } catch (ex) {
    logger.error('db error: ', ex)
  }
}

const getNonLexicalsRaw = async () => {
  try {
    if (!mongodb) {
      return defaults
    }

    const coll = mongodb.db('lexical').collection('nonLexicals')
    const data = await coll.find({ }).toArray()

    return data
  } catch (ex) {
    logger.error('db error: ', ex)
  }
}

const getToken = async (token) => {
  try {
    const coll = mongodb.db('lexical').collection('nonLexicals')
    const data = await coll.findOne({ data: token })

    return data
  } catch (ex) {
    logger.error('db error: ', ex)
    throw ex
  }
}

const addToken = async (token) => {
  try {
    const coll = mongodb.db('lexical').collection('nonLexicals')
    const data = await coll.updateOne({ data: token }, { $set: { data: token }, $setOnInsert: { date: new Date() } }, { upsert: true })

    return data
  } catch (ex) {
    logger.error('db error: ', ex)
    throw ex
  }
}

const deleteToken = async (token) => {
  try {
    const coll = mongodb.db('lexical').collection('nonLexicals')
    const data = await coll.deleteOne({ data: token })

    return data
  } catch (ex) {
    logger.error('db error: ', ex)
    throw ex
  }
}

module.exports = {
  initialize,
  getNonLexicals,
  getNonLexicalsRaw,
  getToken,
  addToken,
  deleteToken
}
