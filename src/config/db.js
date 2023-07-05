const { MongoMemoryServer } = require('mongodb-memory-server');

async function startDatabase() {
  const mongoServer = new MongoMemoryServer();
  await mongoServer.start();
  const mongoUri = mongoServer.getUri();
  return mongoUri;
}

module.exports = { startDatabase };