require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite requisições de outras origens (seu front-end)
app.use(express.json()); // Permite que o servidor entenda JSON

// Conexão com o Banco de Dados
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado ao MongoDB com sucesso!'))
    .catch(err => console.error('Falha ao conectar ao MongoDB:', err));

// Rotas da API
app.use('/api', apiRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.send('Servidor do Jogo está no ar!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});