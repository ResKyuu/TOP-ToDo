import { createElement } from "../domUtils.js";
import { renderTasksaAndAddButton } from "./taskUiRender.js"; // Assuming taskUiRender.js is in the same Logic folder
import plus from "../svgs/plus.svg"; // Importing the plus icon for the "Add Task List" button

// Function to render project contents including task lists and the "Add Task List" button
export function renderProjectContents(
  projectData,
  displayContainer,
  projectId,
  fullSideBarData,
  onTaskListAdded
) {
  displayContainer.innerHTML = ""; // Clear previous content

  if (projectData.contents && Array.isArray(projectData.contents)) {
    projectData.contents.forEach((contentItem, index) => {
      const tasksAndButtonContainer = createElement("div", {
        classList: "projectItemContainer",
      });
      const projectTaskButtonTargetContainer = createElement("div", {
        classList: "projectTaskButtonTargetContainer",
      });

      const taskListElement = createElement("div", {
        classList: "projectTaskItem",
        children: [
          createElement("div", {
            classList: "projectTaskItemHeader",
            children: [
              createElement("h2", {
                textContent: contentItem.title,
                classList: "projectTaskTitle",
              }),
            ],
          }),
          tasksAndButtonContainer,
          projectTaskButtonTargetContainer,
        ],
      });
      displayContainer.appendChild(taskListElement);
      renderTasksaAndAddButton(
        contentItem,
        tasksAndButtonContainer,
        projectTaskButtonTargetContainer,
        projectId,
        index 
      );
    });
  }

  // Create and add the "Add New Task List" button/card
  const addTaskListCard = createElement("div", {
    classList: [
      "projectTaskItem",
      "addTaskListButtonCard",
      "homeMainAddTaskList",
    ], 
    children: [
      createElement("div", {
        classList: ["projectTaskItemHeader", "addTaskListHeader"], // Corrected: Use an array for multiple classes
        children: [
          createElement("img", {
            src: plus,
            classList: "addTaskListIcon",
            alt: "Add Task List Icon",
          }),
          createElement("h2", {
            textContent: "Add New Task List",
            classList: ["projectTaskTitle", "addTaskListTitle"], // Corrected: Use an array for multiple classes
          }),
        ],
      }),
    ],
  });

  addTaskListCard.addEventListener("click", () => {
    const newTaskListTitle = prompt("Enter title for the new Task List:");
    if (newTaskListTitle && newTaskListTitle.trim() !== "") {
      if (!projectData.contents) {
        projectData.contents = [];
      }
      const newContentItem = {
        title: newTaskListTitle.trim(),
        tasks: [],
      };
      projectData.contents.push(newContentItem);

      // Call the callback to notify that data has changed (for potential saving)
      if (onTaskListAdded) {
        onTaskListAdded(fullSideBarData);
      }

      renderProjectContents(
        projectData,
        displayContainer,
        projectId,
        fullSideBarData,
        onTaskListAdded
      );
    } else if (newTaskListTitle !== null) {
      alert("Task List title cannot be empty.");
    }
  });
  displayContainer.appendChild(addTaskListCard);
}
