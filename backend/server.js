const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('frontend'));

// In-memory storage for tasks
let tasks = [];
let currentId = 1;

// Routes
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  const newTask = { id: currentId++, title, description };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== parseInt(id));
  res.status(200).send();
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const task = tasks.find((task) => task.id === parseInt(id));
  if (task) {
    task.title = title;
    task.description = description;
    res.status(200).json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
