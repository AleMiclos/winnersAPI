const express = require('express'); 
const { addWinner, getWinners, deleteWinner } = require('../controllers/winnerController.js');
const router = express.Router();

/**
 * @swagger
 * /winners/add:
 *   post:
 *     summary: Adiciona um novo vencedor
 *     tags: [Winners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - prize
 *               - date
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do vencedor
 *               prize:
 *                 type: string
 *                 description: Prêmio do vencedor
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Data em que o vencedor recebeu o prêmio
 *     responses:
 *       201:
 *         description: Vencedor adicionado com sucesso
 *       400:
 *         description: Erro ao adicionar vencedor
 */
router.post('/add', addWinner);

/**
 * @swagger
 * /winners:
 *   get:
 *     summary: Retorna todos os vencedores
 *     tags: [Winners]
 *     responses:
 *       200:
 *         description: Lista de vencedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID do vencedor
 *                   name:
 *                     type: string
 *                     description: Nome do vencedor
 *                   prize:
 *                     type: string
 *                     description: Prêmio do vencedor
 *                   date:
 *                     type: string
 *                     format: date
 *                     description: Data em que o vencedor recebeu o prêmio
 *       400:
 *         description: Erro ao buscar vencedores
 */
router.get('/', getWinners);

/**
 * @swagger
 * /winners/{id}:
 *   delete:
 *     summary: Deleta um vencedor pelo ID
 *     tags: [Winners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do vencedor
 *     responses:
 *       200:
 *         description: Vencedor deletado com sucesso
 *       400:
 *         description: Erro ao deletar vencedor
 */
router.delete('/:id', deleteWinner);

module.exports = router;
