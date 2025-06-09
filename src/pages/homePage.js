import "../styles/homeStyle.css";
import { createElement } from "../domUtils.js";
import sideBarDataImport from "../Data/projectData.json"; // Using imported JSON as the default project structure.
import { handleMouseDrag } from "../Logic/mousedrag.js";
import { createSideBarItem } from "../Logic/sideBarUiRender.js";
import { handleProjectItemClick } from "../Logic/projectInteraction.js";
// SVG and image assets for the UI.
import arrowdown from "../svgs/arrowdown.svg";
import bell from "../svgs/bell.svg";
import dock from "../svgs/docksidebar.svg";
import profilePicture from "../images/profilepicture.jpg";
import plus from "../svgs/plus.svg";

// Unique key for storing and retrieving application data in localStorage.
const LOCAL_STORAGE_KEY = "todoAppData";

function loadHomePage() {
  const content = document.querySelector("#content");

  let currentSideBarData;
  // Attempt to load existing data from localStorage.
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (storedData) {
    try {
      currentSideBarData = JSON.parse(storedData);
      // Validate that the loaded data is an array, otherwise, it's not the expected format.
      if (!Array.isArray(currentSideBarData)) {
        console.warn(
          "Data from localStorage is not an array. Reverting to default project data."
        );
        currentSideBarData = JSON.parse(JSON.stringify(sideBarDataImport));
      }
    } catch (error) {
      console.error(
        "Failed to parse data from localStorage. Using default project data:",
        error
      );
      // If parsing fails (e.g., corrupted data), use a fresh copy of the default data.
      currentSideBarData = JSON.parse(JSON.stringify(sideBarDataImport));
    }
  } else {
    // If no data is found in localStorage, initialize with a deep copy of the default project data.
    currentSideBarData = JSON.parse(JSON.stringify(sideBarDataImport));
  }

  // Create sidebar navigation items from the current project data.
  const sideBarItems = currentSideBarData.map((itemData, index) => {
    const item = createSideBarItem(itemData);
    // Assign a unique ID to each project item for event handling and targeting.
    // Prefers an ID from the data itself, falling back to an index-based ID.
    item.id = itemData.id || `project-${index + 1}`;
    return item;
  });

  // Add click event listeners to each sidebar project item.
  sideBarItems.forEach((item) => {
    item.addEventListener("click", () => {
      handleProjectItemClick(item, currentSideBarData, LOCAL_STORAGE_KEY);
      // Update the active state of sidebar items.
    });
  });
  // Construct the sidebar element with its header, items, and footer.
  const sideBar = createElement("div", {
    id: "sideBar",
    classList: "mainSideBar",
    children: [
      createElement("div", {
        classList: "sideBarHeader", // This div wraps all sidebar content for layout.
        children: [
          // Sidebar header section with profile info and icons.
          createElement("div", {
            classList: "homeSideBarHeader",
            children: [
              createElement("div", {
                classList: "homeSideBarHeaderContainer",
                children: [
                  createElement("div", {
                    classList: "homeSideBarHeaderInfo",
                    children: [
                      createElement("img", {
                        src: profilePicture,
                        classList: "homeProfilePicture",
                        alt: "Profile Picture",
                      }),
                      createElement("h1", {
                        textContent: "ResKyuu",
                        classList: "homeProfileName",
                      }),
                      createElement("img", {
                        src: arrowdown,
                        classList: "homeArrowDownIcon",
                        alt: "Arrow Down Icon",
                      }),
                    ],
                  }),
                  createElement("div", {
                    classList: "homeSideBarHeaderIcons",
                    children: [
                      createElement("img", {
                        src: bell,
                        classList: "homeBellIcon",
                        alt: "Notification Bell Icon",
                      }),
                      createElement("img", {
                        src: dock,
                        classList: "homeDockIcon",
                        alt: "Dock Sidebar Icon",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          createElement("div", {
            classList: ["homeSideBarProjectAdd"],
            children: [],
          }),
          // Container for the list of project items in the sidebar.
          createElement("div", {
            classList: "homeSideBarItems",
            children: sideBarItems,
          }),
          // Footer section of the sidebar.
          createElement("div", {
            classList: "homeSideBarFooter",
            children: [
              createElement("p", {
                textContent: "To-Do List, made by",
              }),
              createElement("a", {
                href: "https://github.com/ResKyuu?tab=repositories",
                textContent: "ResKyuu",
                classList: "homeFooterLink",
              }),
            ],
          }),
        ],
      }),
    ],
  });

  // Construct the main content area where project details will be displayed.
  const mainContent = createElement("div", {
    id: "mainContent",
    classList: "mainContent",
    children: [
      createElement("div", {
        classList: "homeMainContent",
        children: [
          createElement("div", {
            classList: "homeMainContentHeader", // Header for the main content area (e.g., project title).
            children: [], // Initially empty, populated when a project is clicked.
          }),
          createElement("div", {
            classList: "homeMainContentBody", // Body where task lists or welcome message are shown.
            children: [
              createElement("p", {
                textContent:
                  "Welcome to the Home Page! Click on a project in the sidebar to view details.",
                classList: "homeMainContentText", // Initial welcome message.
              }),
            ],
          }),
        ],
      }),
    ],
  });

  const sideBarItemsContainer = sideBar.querySelector(".homeSideBarProjectAdd");
  const addProjectButton = createElement("div", {
    classList: ["homeSideBarItem", "homeAddProjectButton"],
    children: [
      createElement("div", {
        classList: "homeSidebarItemIconContainer",
        children: [
          createElement("img", {
            src: plus,
            classList: "homeSidebarItemIcon",
            alt: "Add Project Icon",
          }),
        ],
      }),
      createElement("div", {
        classList: "homeSidebarItemText",
        children: [
          createElement("h3", {
            textContent: "Add Project",
            classList: "homeSidebarItemName",
          }),
        ],
      }),
    ],
  });

  addProjectButton.addEventListener("click", () => {
    const projectName = prompt("Enter the new project name:");
    if (projectName && projectName.trim() !== "") {
      const newProjectData = {
        name: projectName.trim(),
        id: `project-${currentSideBarData.length + 1}`, // Generate a new unique ID.
        alt: `Icon for Project-${currentSideBarData.length + 1}`,
        contents: [], // Initialize with an empty task list.
      };

      currentSideBarData.push(newProjectData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentSideBarData));

      const newProjectItem = createSideBarItem(newProjectData);
      newProjectItem.id = newProjectData.id; // Set the ID for the new project item.

      newProjectItem.addEventListener("click", () => {
        handleProjectItemClick(newProjectItem, currentSideBarData, LOCAL_STORAGE_KEY);
      });   

      const sideBarItemsContainer = sideBar.querySelector(".homeSideBarItems");
      sideBarItemsContainer.appendChild(newProjectItem);
      alert("Project added successfully!");
    } else if (projectName !== null) {
      alert("Project name cannot be empty.");
    }
  });

  // Append the constructed sidebar and main content areas to the page.
  sideBarItemsContainer.appendChild(addProjectButton);
  content.appendChild(sideBar);
  content.appendChild(mainContent);
  // Initialize mouse drag scrolling for the main content body.
  handleMouseDrag();
}

export { loadHomePage };
