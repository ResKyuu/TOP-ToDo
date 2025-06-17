import { createElement } from "../domUtils.js";
import { renderTasksaAndAddButton } from "./taskUiRender.js"; // Assuming taskUiRender.js is in the same Logic folder
import { showNewTaskListModal } from "../moduls/newTaskList.js"; // Importing the new task list title from the modal
import plus from "../svgs/plus.svg"; // Importing the plus icon for the "Add Task List" button
import trashIcon from "../svgs/trash.svg"; // Importing the trash icon for task deletion

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
    projectData.contents.forEach((contentItem) => {
      // 'index' is no longer primarily used for deletion
      const deleteIconEl = createElement("img", {
        src: trashIcon,
        classList: ["deleteTaskListIcon", "deleteTaskIcon"],
        alt: "Delete Task Icon",
      });

      // Ensure contentItem has an ID. This is crucial.
      if (!contentItem.id) {
        console.error("Task list item is missing an ID:", contentItem.title);
        // Fallback or assign temporary ID if necessary, but data should be consistent
        contentItem.id = `tl-missing-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`;
      }
      const contentItemId = contentItem.id; // Capture the ID

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
              createElement("div", {
                classList: "projectTaskItemHeaderTextContainer",
                children: [
                  createElement("h2", {
                    textContent: contentItem.title,
                    classList: "projectTaskTitle",
                  }),
                ],
              }),
              createElement("div", {
                classList: "projectTaskItemHeaderIconContainer",
                children: [deleteIconEl],
              }),
            ],
          }),
          tasksAndButtonContainer,
          projectTaskButtonTargetContainer,
        ],
      });
      displayContainer.appendChild(taskListElement);
      deleteIconEl.addEventListener("click", () => {
        if (
          confirm(
            `Are you sure you want to delete the tasklist: "${contentItem.title}"?`
          )
        ) {
          const indexToDelete = projectData.contents.findIndex(
            (ci) => ci.id === contentItemId
          ); // Find by ID
          if (indexToDelete !== -1) {
            projectData.contents.splice(indexToDelete, 1);
          } else {
            console.warn(
              "Could not find task list to delete by ID:",
              contentItemId,
              "It might have already been deleted."
            );
          }

          // Call the callback to notify that data has changed (for potential saving)
          if (onTaskListAdded) {
            onTaskListAdded(fullSideBarData);
          }

          // Re-render the project contents to update the UI
          renderProjectContents(
            projectData,
            displayContainer,
            projectId,
            fullSideBarData,
            onTaskListAdded
          );
        }
      });

      renderTasksaAndAddButton(
        contentItem,
        tasksAndButtonContainer,
        projectTaskButtonTargetContainer,
        projectId,
        contentItem.id // Pass task list ID instead of index for task key generation
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
        classList: ["projectTaskItemHeader", "addTaskListHeader"],
        children: [
          createElement("img", {
            src: plus,
            classList: "addTaskListIcon",
            alt: "Add Task List Icon",
          }),
          createElement("h2", {
            textContent: "Add New Task List",
            classList: ["projectTaskTitle", "addTaskListTitle"],
          }),
        ],
      }),
    ],
  });

  addTaskListCard.addEventListener("click", async () => {
    try {
      const newTaskListTitle = await showNewTaskListModal();
      if (newTaskListTitle && newTaskListTitle.trim() !== "") {
        if (!projectData.contents) {
          projectData.contents = [];
        }
        const newContentItem = {
          id: `tl-${projectId}-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`, // Generate a more unique ID
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
    } catch (error) {
      console.error("Adding new Task List Process was canceled", error);
    }
  });
  displayContainer.appendChild(addTaskListCard);
}
