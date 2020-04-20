const express = require('express')
const router = express.Router()

const controller = require('../controllers/dictionaryController')

/**
 * @swagger
 * /api/dictionary/:
 *   get:
 *     tags:
 *       - dictionary
 *     description: endpoint for getting non lexical dictinoary items
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: done
 *       400:
 *         description: parameter missing
 *       500:
 *         description: server error
 */
router.get('/', controller.get)

module.exports = router
