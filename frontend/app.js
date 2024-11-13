// frontend/app.js
document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
  
    await fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });
  
    document.getElementById('taskForm').reset();
    loadTasks();
  });
  
  async function loadTasks() {
    const response = await fetch('/tasks');
    const tasks = await response.json();
  
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
  
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.innerHTML = `${task.title} - ${task.description} <button class="delete" onclick="deleteTask('${task.id}')">Delete</button>`;
      taskList.appendChild(li);
    });
  }
  
  async function deleteTask(id) {
    await fetch(`/tasks/${id}`, { method: 'DELETE' });
    loadTasks();
  }
  
  loadTasks();
  