import { createElement } from "../domUtils.js";
import { renderTasksaAndAddButton } from "./taskUiRender.js";
import { showDeleteTaskListModal } from "../modals/deleteTaskList.js";
import { showEditTaskListModal } from "../modals/editTaskList.js";
import { showNewTaskListModal } from "../modals/newTaskList.js";
import plus from "../svgs/plus.svg";
import trashIcon from "../svgs/trash.svg";
import edit from "../svgs/edit.svg";

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
      // Determine border color based on priority
      let borderColorVar = "--task-item-default-color";
      if (contentItem.priority === "pending")
        borderColorVar = "--task-item-pending-color";
      else if (contentItem.priority === "completed")
        borderColorVar = "--task-item-completed-color";
      else if (contentItem.priority === "overdue")
        borderColorVar = "--task-item-overdue-color";

      const deleteIconEl = createElement("img", {
        src: trashIcon,
        classList: ["deleteTaskListIcon", "deleteTaskIcon"],
        alt: "Delete Task Icon",
      });
      const editIconEl = createElement("img", {
        src: edit,
        classList: ["editTaskListIcon", "deleteTaskIcon"],
        alt: "Edit Task Icon",
      });

      if (!contentItem.id) {
        console.error("Task list item is missing an ID:", contentItem.title);
        contentItem.id = `tl-missing-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`;
      }
      const contentItemId = contentItem.id;

      const tasksAndButtonContainer = createElement("div", {
        classList: "projectItemContainer",
      });
      const projectTaskButtonTargetContainer = createElement("div", {
        classList: "projectTaskButtonTargetContainer",
      });

      const taskListElement = createElement("div", {
        classList: "projectTaskItem",
        // Set border color using inline style and CSS variable
        style: `border-left: 5px solid var(${borderColorVar}) !important;`,
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
                children: [editIconEl, deleteIconEl],
              }),
            ],
          }),
          tasksAndButtonContainer,
          projectTaskButtonTargetContainer,
        ],
      });
      displayContainer.appendChild(taskListElement);

      deleteIconEl.addEventListener("click", async () => {
        try {
          const confirmed = await showDeleteTaskListModal(contentItem.title);
          if (confirmed) {
            const indexToDelete = projectData.contents.findIndex(
              (ci) => ci.id === contentItemId
            );
            if (indexToDelete !== -1) {
              projectData.contents.splice(indexToDelete, 1);
            } else {
              console.warn(
                "Could not find task list to delete by ID:",
                contentItemId,
                "It might have already been deleted."
              );
            }

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
          } else {
            console.log("Task List deletion was canceled.");
          }
        } catch (err) {
          console.log("Task List deletion was canceled.");
        }
      });

      // Edit event listener
      editIconEl.addEventListener("click", async () => {
        try {
          const { title: newTitle, priority: newPriority } =
            await showEditTaskListModal(
              contentItem.title,
              contentItem.priority || "default"
            );
          if (
            (newTitle && newTitle !== contentItem.title) ||
            (newPriority && newPriority !== contentItem.priority)
          ) {
            contentItem.title = newTitle;
            contentItem.priority = newPriority;
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
          }
        } catch {
          // Modal cancelled
        }
      });

      renderTasksaAndAddButton(
        contentItem,
        tasksAndButtonContainer,
        projectTaskButtonTargetContainer,
        projectId,
        contentItem.id
      );
    });
  }

  // Add Task List Card
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
      const { title: newTaskListTitle, priority: newPriority } =
        await showNewTaskListModal();
      if (newTaskListTitle && newTaskListTitle.trim() !== "") {
        if (!projectData.contents) {
          projectData.contents = [];
        }
        const newContentItem = {
          id: `tl-${projectId}-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`,
          title: newTaskListTitle.trim(),
          tasks: [],
          priority: newPriority || "default",
        };
        projectData.contents.push(newContentItem);

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
