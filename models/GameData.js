const mongoose = require('mongoose');

const gameDataSchema = new mongoose.Schema({
    gameName: {
        type: String,
        required: true,
        enum: ['Nave Espacial', 'Reflexo Neon', 'Teste de Reação'] // Garante que só os nomes corretos sejam salvos
    },
    playerName: {
        type: String,
        required: true,
        trim: true
    },
    score: {
        type: Number,
        required: true
    },
    timePlayed: { // Em segundos
        type: Number,
        default: 0
    },
    rating: { // De 1 a 5
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
}, {
    timestamps: true // Adiciona os campos createdAt e updatedAt automaticamente
});

module.exports = mongoose.model('GameData', gameDataSchema);