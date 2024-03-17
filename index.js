var pendingTasksList = document.getElementById("pendingTasks");
var completedTasksList = document.getElementById("completedTasks");
// Function to add a new task
function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskText = taskInput.value.trim();
  let specialCharacter = /([=<>!@#%^&*~`{};])/i;
  let isSC = specialCharacter.test(taskText);
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  } else if (isSC) {
    alert("Please Don't Use Special Character")
    return
  }

  document.querySelector('.pendingTasks').style.display = "block"


  // Create a new task object
  var task = {
    text: taskText, // Task text
    completed: false // Task completion status
  };

  // Add the new task to the tasks array
  tasks.push(task);
  updateUI();
  taskInput.value = ""; // Clear the task input field
}

// Function to toggle task completion status
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  updateUI();
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  empty();
  updateUI();
}



// Function to update the user interface with tasks
function updateUI() {
  pendingTasksList.innerHTML = "";
  completedTasksList.innerHTML = "";

  // Loop through each task in the tasks array
  tasks.forEach(function (task, index) {
    var listItem = document.createElement("li");
    listItem.classList.add("task-item");
    if (task.completed) {
      listItem.classList.add("completed");
    }

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
      toggleComplete(index);

    });

    var taskInfo = document.createElement("span");
    taskInfo.textContent = task.text;

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteTask(index);
    });

    // Append elements to the list item
    listItem.appendChild(checkbox);
    listItem.appendChild(taskInfo);
    listItem.appendChild(deleteButton);

    // Append the list item to the appropriate list
    if (task.completed) {
      completedTasksList.appendChild(listItem);
    } else {
      pendingTasksList.appendChild(listItem);
    }

  });

  empty()
}
var tasks = []; // Array to store tasks
console.log(tasks.length);
if (tasks.length == 0) {
  document.querySelector('.empty').style.display = "block"
} else {
  document.querySelector('.empty').style.display = "none"
}
updateUI(); // Initial UI update

document.querySelector('.pendingTasks').addEventListener('click', (e) => {
  e.target.nextElementSibling.classList.remove('active')
  e.target.classList.add('active')
  completedTasksList.style.display = "none"
  pendingTasksList.style.display = "block"
})

document.querySelector('.completedTasks').addEventListener('click', (e) => {
  e.target.previousElementSibling.classList.remove('active')
  pendingTasksList.style.display = "none"
  e.target.classList.add('active')
  completedTasksList.style.display = "block"
})

function empty() {
  if (tasks.length == 0) {
    document.querySelector('.empty').style.display = "block"
  } else {
    document.querySelector('.empty').style.display = "none"
  }
}