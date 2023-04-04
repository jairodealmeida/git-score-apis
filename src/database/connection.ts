/**
 * connection.ts: Este arquivo deve lidar com a conexão com o banco de dados e 
 * exportar a conexão para ser usada em outros arquivos. Aqui está um exemplo:
 */

import mongoose from 'mongoose';

const connectionUrl = 'mongodb://localhost:27017/git-score-db'; // Substituir com a sua URL de conexão

const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao se conectar ao banco de dados:', error.message);
    process.exit(1); // Encerra a aplicação em caso de erro de conexão com o banco de dados
  }
};

export default connectToDatabase;
