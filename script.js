const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const getTasksBtn = document.getElementById('getTasksBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const pendingCount = document.getElementById('pendingCount');

let tasks = [];

// Function to create a new task
function createTask(task) {
    tasks.push({ text: task, completed: false });
    renderTasks();
}

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        // Task text
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.classList.add('completed');
        }
        
        // Toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = task.completed ? 'Undo' : 'Done';
        toggleBtn.classList.add('toggleBtn');
        toggleBtn.addEventListener('click', () => toggleTask(index));

        li.appendChild(taskText);
        li.appendChild(toggleBtn);
        taskList.appendChild(li);
    });
    updateTaskCount();
}

// Function to toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Function to update task count
function updateTaskCount() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    taskCount.textContent = `Total tasks: ${totalTasks}`;
    pendingCount.textContent = `Pending tasks: ${pendingTasks}`;
}

// Function to get all tasks
function getAllTasks() {
    console.log("Tasks:", tasks);
    alert(JSON.stringify(tasks, null, 2)); // Display tasks in an alert
}

// Event listener for adding a task when button is clicked
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        createTask(taskText);
        taskInput.value = '';
    }
});

// Event listener for getting all tasks
getTasksBtn.addEventListener('click', getAllTasks);

// Event listener for adding a task when the Enter key is pressed
taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const taskText = taskInput.value.trim();
        if (taskText) {
            createTask(taskText);
            taskInput.value = '';
        }
    }
});
