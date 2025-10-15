require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// --- CONFIGURAÇÃO DE CORS ESPECÍFICA ---

// 1. Lista de domínios permitidos
const allowedOrigins = [
    'https://reflexogame.vercel.app',
    'https://reactiongamefsl.vercel.app',
    'https://spaceshipfsl.vercel.app',
    'http://127.0.0.1:61035',
    'http://localhost:3000',
    'https://tabela-react-js.vercel.app',
    'https://reflexogame.vercel.app'
];

// 2. Opções do CORS
const corsOptions = {
    origin: '*'
};

// --- FIM DA CONFIGURAÇÃO DE CORS ---


// Middlewares
app.use(cors(corsOptions)); // 3. APLICA AS OPÇÕES DE CORS AQUI
app.use(express.json());

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
