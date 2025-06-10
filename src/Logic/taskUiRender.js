import { createElement } from "../domUtils.js";
import trashIcon from "../svgs/trash.svg"; // Importing the trash icon for task deletion

function _renderTasksOnly(contenItem, tasksDisplayContainerElement, localStorageKey) {
  tasksDisplayContainerElement.innerHTML = ""; // Clear previous tasks

  if (contenItem.tasks && Array.isArray(contenItem.tasks)) {
    contenItem.tasks.forEach((task, taskSpecificIndex) => {
      const deleteIconEl = createElement("img", {
        src: trashIcon,
        classList: "deleteTaskIcon",
        alt: "Delete Task Icon",
        attributes: { "data-task-index": taskSpecificIndex }, // Store the index for deletion
      });

      const taskElement = createElement("div", {
        classList: "projectTaskDetails",
        children: [
          createElement("div", {
            classList: "projectTaskHeaderContainer",
            children: [
              createElement("div", {
                classList: "projectTaskHeaderTextContainer",
                children: [
                  createElement("h3", {
                    textContent: task.title,
                    classList: "projectTaskTitle",
                  }), // Add the delete icon to the header
                ],
              }),
              createElement("div", {
                classList: "projectTaskHeaderIconContainer",
                children: [deleteIconEl],
              }),
            ],
          }),
          createElement("div", {
            classList: "projectTaskContentContainer",
            children: [
              createElement("p", {
                textContent: task.description,
                classList: "projectTaskDescription",
              }),
            ],
          }),
        ],
      });

      deleteIconEl.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent the click from bubbling up to the task element
        const taskIndexToDelete = parseInt(
          event.target.getAttribute("data-task-index")
        );

        if (
          confirm(`Are you sure you want to delete the task: "${task.title}"?`)
        ) {
          contenItem.tasks.splice(taskIndexToDelete, 1); // Remove the task from the array
          localStorage.setItem(
            localStorageKey,
            JSON.stringify(contenItem.tasks)
          );
          _renderTasksOnly(contenItem, tasksDisplayContainerElement); // Re-render the tasks
        }
      });

      tasksDisplayContainerElement.appendChild(taskElement);
    });
  }
}

// Modified function to set up tasks and the "Add Task" button
function renderTasksaAndAddButton(
  contenItem,
  tasksContainerElement, // Container where tasks will be displayed
  addTaskButtonContainerElement, // Container where the "Add Task" button will be placed
  projectId, // Project ID to be used in localStorage key
  taskListIndex
) {
  // get LocalStorage key based on projectId, taskListIndex, and contenItem title
  const localStorageKey = `project_${projectId}_taskListIndex_${taskListIndex}`;

  // Initialize tasks array if it doesn't exist in contenItem
  const storedTasks = localStorage.getItem(localStorageKey);
  if (storedTasks) {
    try {
      contenItem.tasks = JSON.parse(storedTasks);
    } catch (error) {
      console.error("Error parsing stored tasks:", error);
    }
  }

  // Initial render of tasks
  _renderTasksOnly(contenItem, tasksContainerElement, localStorageKey);

  // Clear the button container before adding the button to ensure only one instance
  addTaskButtonContainerElement.innerHTML = "";

  const addTaskButton = createElement("div", {
    textContent: "Add Task",
    classList: "addTaskButton",
  });

  addTaskButton.addEventListener("click", () => {
    const taskTitle = prompt("Enter task title:");
    if (taskTitle === null || taskTitle.trim() === "") {
      alert("Task title cannot be empty.");
      return;
    }
    const taskDescription = prompt("Enter new task description (optional):");

    const newTask = {
      title: taskTitle.trim(),
      description: taskDescription ? taskDescription.trim() : "",
    };

    if (!Array.isArray(contenItem.tasks)) {
      contenItem.tasks = [];
    }
    contenItem.tasks.push(newTask);

    //Parse the tasks and store them in localStorage
    localStorage.setItem(localStorageKey, JSON.stringify(contenItem.tasks));

    // Only re-render the tasks, not the button or the entire section
    _renderTasksOnly(contenItem, tasksContainerElement);
    alert("Task added successfully!");
  });

  addTaskButtonContainerElement.appendChild(addTaskButton);
}

export { renderTasksaAndAddButton };
