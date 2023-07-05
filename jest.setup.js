const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const mongoServer = new MongoMemoryServer();

beforeAll(async () => {
  // Conectar ao banco de dados em memória antes de executar os testes
  const {
    MongoMemoryServer
} = require('mongodb-memory-server');

try {
    const startDatabase = async () => {
        const mongoServer = new MongoMemoryServer();
        await mongoServer.start();
        const mongoUri = mongoServer.getUri();
        return mongoUri;
    };
    module.exports = startDatabase;
} catch (error) {
    // Tratar o erro aqui
    console.error('Erro durante a inicialização da aplicação:', error);
    process.exit(1); // Encerrar a execução da aplicação devido ao erro
}
});

afterAll(async () => {
  // Desconectar o banco de dados após executar os testes
  await mongoose.disconnect();
  await mongoServer.stop();
});
