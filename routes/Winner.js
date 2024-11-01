// routes/winners.js
const express = require('express');
const { addWinner, getWinners, deleteWinner } = require('../controllers/winnerController');
const router = express.Router();

router.post('/add', addWinner);
router.get('/', getWinners);
router.delete('/:id', deleteWinner);

module.exports = router;
