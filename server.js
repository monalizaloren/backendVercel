const express = require('express');
const connectDB = require('./config/connectDB'); // Caminho para o arquivo de conexão ao MongoDB
const Squad = require('./models/Squad'); // Caminho para o modelo do MongoDB

// Criar a aplicação Express
const app = express();

// Middleware para lidar com JSON no corpo das requisições
app.use(express.json());

// Conectar ao MongoDB
connectDB();

// Rota principal para obter squads disponíveis
app.get('/api/get-squads', async (req, res) => {
  try {
    // Buscar squads disponíveis no MongoDB
    const squadsDisponivel = await Squad.find({ status: 'disponível' });

    if (!squadsDisponivel || squadsDisponivel.length === 0) {
      return res.status(404).json({ message: 'Nenhum squad disponível encontrado.' });
    }

    // Enviar a lista de squads disponíveis como resposta
    res.json({ squadsDisponivel });
  } catch (error) {
    console.error('Erro ao buscar squads:', error);
    res.status(500).json({ message: 'Erro ao buscar squads', error: error.message });
  }
});

// Definir a porta e iniciar o servidor
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
