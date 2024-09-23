const mongoose = require('mongoose');

// Função para conectar ao MongoDB
const connectDB = async () => {
  try {
    // Verificar se já existe uma conexão aberta
    if (mongoose.connection.readyState >= 1) {
      console.log('Já existe uma conexão ativa com o MongoDB.');
      return;
    }

    // Conectar ao MongoDB usando a variável de ambiente
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conexão ao MongoDB realizada com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1); // Finaliza o processo em caso de erro
  }
};

module.exports = connectDB;
