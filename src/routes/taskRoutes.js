const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.get('/tasks', taskController.listar);
router.post('/tasks', taskController.criar);
router.put('/tasks/:id', taskController.atualizar);
router.delete('/tasks/:id', taskController.excluir);

module.exports = router;
