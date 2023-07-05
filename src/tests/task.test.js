const mongoose = require('mongoose');
const Task = require('../models/taskModel');
const request = require('supertest');
const app = require('../app-test');
const {
    startDatabase
} = require('../config/db'); //Função de inicialização do base de dados
const {
    MongoMemoryServer
} = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
beforeAll(async () => {
    // Inicializacao da base de dados em memória antes de executar os testes
    const mongoUri = await startDatabase();
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}, 10000); //Tempo limite para 10000ms (10 segundos)

afterAll(async () => {
    // Encerrar a conexão e parar o servidor de base de dados em memória após os testes
    await mongoose.disconnect();
    await mongod.stop();
});

beforeEach(async () => {
    // Limpar todos os registros da base de dados antes de cada teste
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});

describe('Testes de unidade - Controladores', () => {
    it('Deve criar uma tarefa', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({
                title: 'Tarefa de teste',
                description: 'Esta é uma tarefa de teste'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.title).toBe('Tarefa de teste');
    }, 10000);

    it('Deve obter uma lista de tarefas', async () => {
        await Task.create({
            title: 'Tarefa 1',
            description: 'Descrição da tarefa 1'
        });
        await Task.create({
            title: 'Tarefa 2',
            description: 'Descrição da tarefa 2'
        });

        const response = await request(app).get('/tasks');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body[0].title).toBe('Tarefa 1');
        expect(response.body[1].title).toBe('Tarefa 2');
    }, 10000);

    it('Deve atualizar uma tarefa', async () => {
        // Criar uma tarefa na base de dados para atualização
        const createdTask = await Task.create({
            title: 'Tarefa para atualizar',
            description: 'Esta é uma tarefa para atualizar',
        });

        // Atualizar a tarefa criada com novos valores
        const response = await request(app)
            .put(`/tasks/${createdTask._id}`)
            .send({
                title: 'Tarefa atualizada',
                description: 'Esta é uma tarefa atualizada',
            });

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Tarefa atualizada');
        expect(response.body.description).toBe('Esta é uma tarefa atualizada');

        // Verificar se a tarefa foi atualizada na base de dados
        const updatedTask = await Task.findById(createdTask._id);
        expect(updatedTask.title).toBe('Tarefa atualizada');
        expect(updatedTask.description).toBe('Esta é uma tarefa atualizada');
    }, 10000);


    it('Deve excluir uma tarefa', async () => {
        // Criar uma tarefa na base de dados para exclusão
        const createdTask = await Task.create({
            title: 'Tarefa para excluir',
            description: 'Esta é uma tarefa para excluir',
        });

        // Excluir a tarefa criada
        const response = await request(app).delete(`/tasks/${createdTask._id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Tarefa excluída com sucesso');

        // Verificar se a tarefa foi excluída da base de dados
        const deletedTask = await Task.findById(createdTask._id);
        expect(deletedTask).toBeNull();
    }, 10000);
});

describe('Testes de integração - Rotas', () => {
    it('Deve criar uma tarefa através da rota POST /tasks', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({
                title: 'Tarefa de teste',
                description: 'Esta é uma tarefa de teste'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.title).toBe('Tarefa de teste');
    }, 10000);

    it('Deve obter uma lista de tarefas através da rota GET /tasks', async () => {
        await Task.create({
            title: 'Tarefa 1',
            description: 'Descrição da tarefa 1'
        });
        await Task.create({
            title: 'Tarefa 2',
            description: 'Descrição da tarefa 2'
        });

        const response = await request(app).get('/tasks');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body[0].title).toBe('Tarefa 1');
        expect(response.body[1].title).toBe('Tarefa 2');
    }, 10000);

    it('Deve atualizar uma tarefa através da rota put', async () => {
        // Criar uma tarefa na base de dados para atualização
        const createdTask = await Task.create({
            title: 'Tarefa para atualizar',
            description: 'Esta é uma tarefa para atualizar',
        });

        // Atualizar a tarefa criada com novos valores
        const response = await request(app)
            .put(`/tasks/${createdTask._id}`)
            .send({
                title: 'Tarefa atualizada',
                description: 'Esta é uma tarefa atualizada',
            });

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Tarefa atualizada');
        expect(response.body.description).toBe('Esta é uma tarefa atualizada');

        // Verificar se a tarefa foi atualizada na base de dados
        const updatedTask = await Task.findById(createdTask._id);
        expect(updatedTask.title).toBe('Tarefa atualizada');
        expect(updatedTask.description).toBe('Esta é uma tarefa atualizada');
    }, 10000);

    it('Deve excluir uma tarefa através da rota delete', async () => {
        // Criar uma tarefa na base de dados para exclusão
        const createdTask = await Task.create({
            title: 'Tarefa para excluir',
            description: 'Esta é uma tarefa para excluir',
        });

        // Excluir a tarefa criada
        const response = await request(app).delete(`/tasks/${createdTask._id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Tarefa excluída com sucesso');

        // Verificar se a tarefa foi excluída da base de dados
        const deletedTask = await Task.findById(createdTask._id);
        expect(deletedTask).toBeNull();
    }, 10000);
});