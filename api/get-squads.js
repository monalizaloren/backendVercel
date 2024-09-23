const mongoose = require('mongoose');
const Squad = require('../models/Squad');
const connectDB = require('../config/connectDB'); // Ajuste conforme a localização

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
