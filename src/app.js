const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const mongoose = require('mongoose');

const {
    startDatabase
} = require('./config/db');

const app = express();

// Configurações CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json());

app.use(taskRoutes);
const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
    const mongoUri = await startDatabase();
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
