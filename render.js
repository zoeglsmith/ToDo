const { ipcRenderer } = require('electron');

// Function to add a task
function addTask() {
  const taskNameInput = document.getElementById('taskName');
  const taskName = taskNameInput.value.trim();

  if (taskName !== '') {
    ipcRenderer.send('addTask', { taskName });
    taskNameInput.value = ''; // Clear the input field
  }
}

// Function to open subtask page
function openSubtasksPage() {
  // Navigate to the subtasks.html page or perform any action you need
  window.location.href = 'subtasks.html';
}

// Listen for tasks from the main process
ipcRenderer.on('updateTasks', (event, tasks) => {
  const taskList = document.getElementById('taskList');

  // Clear existing tasks
  taskList.innerHTML = '';

  // Display tasks
  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    
    // Create label for the task
    const label = document.createElement('label');
    label.textContent = task.taskName;

    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // Set up flexbox for the task item
    taskItem.style.display = 'flex';
    taskItem.style.alignItems = 'center';

    // Append label and checkbox to the task item
    taskItem.appendChild(label);
    taskItem.appendChild(checkbox);

    // Add click event listener to each task item
    taskItem.addEventListener('click', openSubtasksPage);

    // Apply styles to the task item
    taskItem.classList.add('task-item');

    // Append task item to the task list
    taskList.appendChild(taskItem);
  });

  // Create hamburger icon container
  const hamburgerContainer = document.createElement('div');
  hamburgerContainer.id = 'hamburgerContainer';  



  // Append hamburger icon to the container
  hamburgerContainer.appendChild(hamburgerIcon);

  // Append the hamburger icon container to the task list
  taskList.appendChild(hamburgerContainer);
});
