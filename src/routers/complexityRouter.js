const express = require('express')
const router = express.Router()

const controller = require('../controllers/complexityController')

/**
 * @swagger
 * /api/complexity/:
 *   post:
 *     tags:
 *       - complexity
 *     description: endpoint for lexical analysis
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: request
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             input:
 *               type: string
 *               required: true
 *               example: Kim loves going to the cinema
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: done
 *       400:
 *         description: parameter missing
 *       500:
 *         description: server error
 */
router.post('/', controller.post)

module.exports = router
