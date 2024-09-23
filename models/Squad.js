// models/Squad.js
const mongoose = require('mongoose');

const squadSchema = new mongoose.Schema({
  squad: String,
  vagas: Number,
  status: String,
  pessoas: Number,
  usuarios: [
    {
      nomeCompleto: String,
      telefone: String,
    },
  ], // Armazena as informações dos usuários que entraram no squad
});

const Squad = mongoose.model('Squad', squadSchema);

module.exports = Squad;
