const express = require('express');
const auth = require('./auth');
const Task = require('./Task');
const router = express.Router();

router.get('/tasks', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.userId });
  res.send(tasks);
});

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({ ...req.body, user: req.userId });
  await task.save();
  res.status(201).send(task);
});

router.put('/tasks/:id', auth, async (req, res) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.userId }, req.body, { new: true });
  if (!task) return res.status(404).send({ error: 'Task not found' });
  res.send(task);
});

router.delete('/tasks/:id', auth, async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!task) return res.status(404).send({ error: 'Task not found' });
  res.send({ message: 'Task deleted successfully' });
});

module.exports = router;
