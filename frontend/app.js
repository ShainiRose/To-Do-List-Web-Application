// Add an event listener to the task form to handle form submission
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

// Function to fetch and display the list of tasks
async function loadTasks() {
  const response = await fetch('/tasks');
  const tasks = await response.json();

  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = task.done ? 'completed' : '';

    li.innerHTML = `
      <input type="checkbox" onclick="toggleTask(event, '${task.id}')" ${task.done ? 'checked' : ''}>
      <span>${task.title} - ${task.description}</span>
      <button class="delete" onclick="deleteTask('${task.id}')">Delete</button>
      <button class="update" onclick="updateTask('${task.id}')">Update</button>
    `;
    taskList.appendChild(li);
  });
}

// Function to delete a task
async function deleteTask(id) {
  await fetch(`/tasks/${id}`, { method: 'DELETE' });
  loadTasks();
}

// Function to toggle the completion status of a task
async function toggleTask(event, id) {
  const done = event.target.checked;

  await fetch(`/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done }),
  });

  loadTasks();
}

// Function to update a task's title and description
async function updateTask(id) {
  const response = await fetch('/tasks');
  const tasks = await response.json();
  const task = tasks.find(task => task.id === parseInt(id));

  if (task) {
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
  } else {
    alert('Task not found!');
  }
}

// Load the tasks when the page is first loaded
loadTasks();
