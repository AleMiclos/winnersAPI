const express = require('express');
const router = express.Router();
const GameData = require('../models/GameData');

// ROTA PARA SALVAR O RESULTADO DE UMA PARTIDA
router.post('/save', async (req, res) => {
    try {
        const { gameName, playerName, score, timePlayed, rating } = req.body;

        // Validação básica
        if (!gameName || !playerName || score === undefined || !rating) {
            return res.status(400).json({ message: 'Dados incompletos fornecidos.' });
        }

        const newGameData = new GameData({
            gameName,
            playerName,
            score,
            timePlayed,
            rating
        });

        const savedData = await newGameData.save();
        res.status(201).json(savedData);

    } catch (error) {
        console.error("Erro ao salvar dados:", error);
        res.status(500).json({ message: 'Erro no servidor ao salvar os dados.' });
    }
});

// ROTA PARA BUSCAR O RANKING (LEADERBOARD) DE UM JOGO
router.get('/leaderboard/:gameName', async (req, res) => {
    try {
        const { gameName } = req.params;

        // Define a ordem da pontuação com base no nome do jogo
        // Para o Teste de Reação, uma pontuação MENOR é melhor.
        const sortOrder = (gameName === 'Teste de Reação') ? 1 : -1;

        const leaderboard = await GameData.find({ gameName: gameName })
            .sort({ score: sortOrder })
            .limit(10)
            .select('playerName score createdAt'); // Seleciona apenas os campos que queremos mostrar

        res.status(200).json(leaderboard);

    } catch (error)
    {
        console.error("Erro ao buscar leaderboard:", error);
        res.status(500).json({ message: 'Erro no servidor ao buscar o leaderboard.' });
    }
});

router.get('/stats', async (req, res) => {
    try {
        const stats = await GameData.aggregate([
            {
                $group: {
                    _id: '$gameName', // Agrupa pelo nome do jogo
                    averageRating: { $avg: '$rating' }, // Calcula a média das notas
                    totalRatings: { $sum: 1 } // NOVO: Soma 1 para cada documento no grupo (conta o total)
                }
            },
            {
                $project: { // Formata a saída
                    _id: 0,
                    gameName: '$_id',
                    averageRating: 1,
                    totalRatings: 1 // Inclui o novo campo no resultado
                }
            }
        ]);
        res.status(200).json(stats);
    } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
        res.status(500).json({ message: 'Erro no servidor ao buscar estatísticas.' });
    }
});


module.exports = router;