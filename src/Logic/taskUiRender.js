import { createElement } from "../domUtils.js";
import trashIcon from "../svgs/trash.svg"; // Importing the trash icon for task deletion
import { showNewTaskModal } from "../modals/newTask.js"; // Importing the modal for adding new tasks
import edit from "../svgs/edit.svg"; // Importing the edit icon for task list editing
import { showEditTaskModal } from "../modals/editTask.js"; // Importing the modal for editing task lists

function _renderTasksOnly(
  contenItem,
  tasksDisplayContainerElement,
  localStorageKey
) {
  tasksDisplayContainerElement.innerHTML = ""; // Clear previous tasks

  if (contenItem.tasks && Array.isArray(contenItem.tasks)) {
    contenItem.tasks.forEach((task, taskSpecificIndex) => {
      const deleteIconEl = createElement("img", {
        src: trashIcon,
        classList: "deleteTaskIcon",
        alt: "Delete Task Icon",
        attributes: { "data-task-index": taskSpecificIndex }, // Store the index for deletion
      });
      const editIconEl = createElement("img", {
        src: edit,
        classList: ["editTaskIcon", "deleteTaskIcon"],
        alt: "Edit Task Icon",
        attributes: { "data-task-index": taskSpecificIndex }, // Store the index for editing
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
                children: [editIconEl, deleteIconEl],
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

        contenItem.tasks.splice(taskIndexToDelete, 1); // Remove the task from the array
        localStorage.setItem(localStorageKey, JSON.stringify(contenItem.tasks));
        _renderTasksOnly(
          contenItem,
          tasksDisplayContainerElement,
          localStorageKey
        ); // Re-render the tasks
      });

      editIconEl.addEventListener("click", async (event) => {
        event.stopPropagation();
        const taskIndexToEdit = parseInt(
          event.target.getAttribute("data-task-index")
        );
        const taskToEdit = contenItem.tasks[taskIndexToEdit];
        try {
          const { title, description } = await showEditTaskModal(
            taskToEdit.title,
            taskToEdit.description
          );
          taskToEdit.title = title;
          taskToEdit.description = description;
          localStorage.setItem(
            localStorageKey,
            JSON.stringify(contenItem.tasks)
          );
          _renderTasksOnly(
            contenItem,
            tasksDisplayContainerElement,
            localStorageKey
          );
        } catch {
          console.error("Editing task was canceled or failed", error);
          return;
        }
      });

      tasksDisplayContainerElement.appendChild(taskElement);
    });
  }
}

// Modified function to set up tasks and the "Add Task" button
function renderTasksaAndAddButton(
  contenItem,
  tasksContainerElement,
  addTaskButtonContainerElement,
  projectId, // Project ID
  taskListId // Changed from taskListIndex to taskListId
) {
  if (!taskListId) {
    console.error(
      "CRITICAL: taskListId is missing in renderTasksaAndAddButton for task list titled:",
      contenItem.title
    );
    // This indicates a problem in how renderTasksaAndAddButton was called from renderProjectContents
    alert(
      `Error: Task list "${contenItem.title}" is missing an ID for task storage. Tasks may not save/load correctly.`
    );
    // Use a placeholder to prevent immediate crash, but this needs fixing at the call site.
    taskListId = `error-missing-id-${Date.now()}`;
  }
  // localStorage key for tasks now uses the task list's unique ID
  const localStorageKey = `project_${projectId}_taskListId_${taskListId}_tasks`;

  const storedTasks = localStorage.getItem(localStorageKey);
  if (storedTasks) {
    try {
      const parsedTasks = JSON.parse(storedTasks);
      if (Array.isArray(parsedTasks)) {
        contenItem.tasks = parsedTasks;
      } else {
        console.warn(
          `Stored tasks for ${localStorageKey} is not an array. Initializing as empty.`
        );
        contenItem.tasks = []; // Initialize if format is wrong
      }
    } catch (error) {
      console.error(
        `Error parsing stored tasks for ${localStorageKey}:`,
        error
      );
      contenItem.tasks = []; // Fallback on parsing error
    }
  } else {
    // If no stored tasks, ensure contenItem.tasks is initialized if not already (e.g. from projectData.json)
    if (!Array.isArray(contenItem.tasks)) {
      console.warn(
        `contenItem.tasks for ${contenItem.title} (list index ${taskListId}) not an array and not in localStorage. Initializing as empty.`
      );
      contenItem.tasks = [];
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

  addTaskButton.addEventListener("click", async () => {
    try {
      const { title, description } = await showNewTaskModal();
      const newTask = {
        title,
        description,
      };

      if (!Array.isArray(contenItem.tasks)) {
        contenItem.tasks = [];
      }
      contenItem.tasks.push(newTask);

      localStorage.setItem(localStorageKey, JSON.stringify(contenItem.tasks));
      _renderTasksOnly(contenItem, tasksContainerElement, localStorageKey);
    } catch (error) {
      console.error("Adding new Task Process was canceled", error);
      return;
    }
  });

  addTaskButtonContainerElement.appendChild(addTaskButton);
}

export { renderTasksaAndAddButton };
