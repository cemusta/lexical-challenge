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
 *         description: list all tokens
 *       500:
 *         description: internal server error
 */
router.get('/', controller.list)

/**
 * @swagger
 * /api/dictionary/{token}:
 *   get:
 *     tags:
 *       - dictionary
 *     parameters:
 *       - name: token
 *         description: non-lexical token
 *         in: path
 *         required: true
 *         type: string
 *     description: add non-lexical token to dataset
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: token found
 *       404:
 *         description: token not found
 *       400:
 *         description: parameter missing
 *       500:
 *         description: internal server error
 */
router.get('/:token', controller.get)

/**
 * @swagger
 * /api/dictionary/{token}:
 *   post:
 *     tags:
 *       - dictionary
 *     parameters:
 *       - name: token
 *         description: non-lexical token
 *         in: path
 *         required: true
 *         type: string
 *     description: add non-lexical token to dataset
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: token added
 *       400:
 *         description: parameter missing
 *       500:
 *         description: internal server error
 */
router.post('/:token', controller.post)

/**
 * @swagger
 * /api/dictionary/{token}:
 *   delete:
 *     tags:
 *       - dictionary
 *     parameters:
 *       - name: token
 *         description: non-lexical token
 *         in: path
 *         required: true
 *         type: string
 *     description: add non-lexical token to dataset
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: token added
 *       400:
 *         description: parameter missing
 *       500:
 *         description: internal server error
 */
router.delete('/:token', controller.delete)

module.exports = router
