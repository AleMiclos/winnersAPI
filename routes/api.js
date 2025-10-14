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

        // Lógica de ordenação dinâmica
        let sortField = 'score';
        let sortOrder = -1; // Padrão: pontuação maior é melhor

        if (gameName === 'Teste de Reação') {
            sortOrder = 1; // Pontuação menor (tempo) é melhor
        } else if (gameName === 'Nave Espacial') {
            sortField = 'timePlayed'; // Para a Nave, o tempo de sobrevivência é o critério
        }

        const leaderboard = await GameData.find({ gameName: gameName })
            .sort({ [sortField]: sortOrder }) // Usa o campo e a ordem corretos para cada jogo
            .limit(50)
            .select('playerName score timePlayed'); // IMPORTANTE: Inclui 'timePlayed' nos dados retornados

        res.status(200).json(leaderboard);

    } catch (error) {
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