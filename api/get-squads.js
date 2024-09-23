const mongoose = require('mongoose');
const Squad = require('../models/Squad');

// Função para conectar ao MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

module.exports = async (req, res) => {
  try {
    await connectDB();
    const squadsDisponivel = await Squad.find({ status: 'disponível' });

    if (!squadsDisponivel || squadsDisponivel.length === 0) {
      return res.status(404).json({ message: 'Nenhum squad disponível encontrado.' });
    }

    res.json({ squadsDisponivel });
  } catch (error) {
    console.error('Erro ao buscar squads:', error);
    res.status(500).json({ message: 'Erro ao buscar squads', error: error.message });
  }
};
