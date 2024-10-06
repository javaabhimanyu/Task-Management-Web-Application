const express = require('express');
const app = express();
app.use(express.json());

let tasks = [{ id: 1, title: 'Task 1', description: 'Learn APIs', completed: false }];

// GET /tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks
app.post('/tasks', (req, res) => {
  const newTask = { id: Date.now(), ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Task not found');
  Object.assign(task, req.body);
  res.json(task);
});

// DELETE /tasks/:id
app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(3000, () => console.log('Server running on port 3000'));
