document.getElementById('taskForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  await fetch('/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });

  document.getElementById('taskForm').reset();
  loadTasks();
});

async function loadTasks() {
  const response = await fetch('/tasks');
  const tasks = await response.json();

  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" onclick="toggleTask(event, '${task.id}')">
      <span>${task.title} - ${task.description}</span>
      <button class="delete" onclick="deleteTask('${task.id}')">Delete</button>
      <button class="update" onclick="updateTask('${task.id}')">Update</button>
    `;
    taskList.appendChild(li);
  });
}

async function deleteTask(id) {
  await fetch(`/tasks/${id}`, { method: 'DELETE' });
  loadTasks();
}

async function updateTask(id) {
  const response = await fetch(`/tasks`);
  const tasks = await response.json();
  const task = tasks.find((t) => t.id === parseInt(id));

  const title = prompt('Update Task Title', task.title);
  const description = prompt('Update Task Description', task.description);

  if (title && description) {
    await fetch(`/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    loadTasks();
  }
}

function toggleTask(event, id) {
  const li = event.target.parentElement;

  if (event.target.checked) {
    li.classList.add('completed'); // Add completed class to change background and style
  } else {
    li.classList.remove('completed'); // Remove completed class to revert style
  }
}

loadTasks();
