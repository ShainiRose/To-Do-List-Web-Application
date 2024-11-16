const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('frontend'));

// In-memory storage for tasks
let tasks = [];
let currentId = 1;

// Create a new task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  const newTask = { id: currentId++, title, description, done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== parseInt(id));
  res.status(200).send();
});

// Update task (title, description, or done status)
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, done } = req.body;

  const task = tasks.find(task => task.id === parseInt(id));
  if (task) {
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (done !== undefined) task.done = done;
    res.status(200).json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

