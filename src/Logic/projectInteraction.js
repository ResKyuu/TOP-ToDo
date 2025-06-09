import { createElement } from "../domUtils.js";
import { renderProjectContents } from "./taskListUiRender.js";

export function handleProjectItemClick(
  item,
  currentSideBarData,
  localStorageKey
) {
  console.log(
    `Clicked on project: ${
      item.querySelector(".homeSidebarItemName").textContent
    }`
  );
  const homeMainContentHeaderElement = document.querySelector(
    ".homeMainContentHeader"
  );
  const displayContentsElement = document.querySelector(".homeMainContentBody");

  // Clear the main content header before displaying new project details.
  homeMainContentHeaderElement.innerHTML = "";

  const currentProjectName = item.querySelector(
    ".homeSidebarItemName"
  ).textContent;

  // Find the corresponding project data object from our current dataset.
  // This ensures any modifications are made to the data in memory.
  const currentProjectData = currentSideBarData.find(
    (p) => p.name === currentProjectName
  );

  // Update the header with the selected project's name and ID.
  homeMainContentHeaderElement.appendChild(
    createElement("h2", {
      textContent: `Project: ${
        item.querySelector(".homeSidebarItemName").textContent
      } | Project ID: ${item.id}`,
      classList: "homeMainContentHeaderText",
    })
  );

  if (currentProjectData) {
    // If project data is found, render its contents (task lists).
    renderProjectContents(
      currentProjectData,
      displayContentsElement,
      item.id,
      currentSideBarData, // Pass the entire dataset for potential modifications (like adding a task list).
      (updatedFullData) => {
        // This callback function is triggered when a new task list is added within renderProjectContents.
        // It saves the entire updated dataset to localStorage to persist changes.
        console.log(
          "Project data has been updated. Saving to localStorage:",
          updatedFullData
        );
        localStorage.setItem(localStorageKey, JSON.stringify(updatedFullData));
      }
    );
  } else {
    // If no specific content is found for the project, display a message.
    displayContentsElement.innerHTML = "";
    displayContentsElement.appendChild(
      createElement("p", {
        textContent: "No content available for this project.",
        classList: "projectNoContent",
      })
    );
  }
}
