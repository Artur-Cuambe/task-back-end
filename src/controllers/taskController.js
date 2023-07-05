const Task = require('../models/taskModel');

const taskController = {
  listar: async (req, res) => {
    try {
      const tasks = await Task.find();
      if(tasks.length){
        res.json(tasks);
      }else{
        res.status(404).json({ message: 'Tarefas não encontradas' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Erro ao obter tarefas' });
    }
  },

  criar: async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Título e descrição são obrigatórios' });
    }

    try {
      const task = new Task({ title, description });
      await task.save();
      res.status(201).json(task);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao criar tarefa' });
    }
  },

  atualizar: async (req, res) => {
    const taskId = req.params.id;
    const { title, description, completed } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Título e descrição são obrigatórios' });
    }

    try {
      const task = await Task.findByIdAndUpdate(taskId, { title, description, completed }, { new: true });
      if (!task) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }
      res.json(task);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao atualizar tarefa' });
    }
  },

  excluir: async (req, res) => {
    const taskId = req.params.id;

    try {
      const task = await Task.findByIdAndDelete(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }
      res.json({ message: 'Tarefa excluída com sucesso' });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao excluir tarefa' });
    }
  },
};

module.exports = taskController;
