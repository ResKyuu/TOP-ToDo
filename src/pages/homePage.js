import "../styles/homeStyle.css";
import { createElement } from "../domUtils.js";
import sideBarData from "../Data/projectData.json";
import { handleMouseDrag } from "../Logic/mousedrag.js";
import { renderTasksaAndAddButton } from "../Logic/taskUiRender.js";
import { createSideBarItem } from "../Logic/sideBarUiRender.js";

//svgs & icons
import arrowdown from "../svgs/arrowdown.svg";
import bell from "../svgs/bell.svg";
import dock from "../svgs/docksidebar.svg";
import profilePicture from "../images/profilepicture.jpg";

let projectNumber = 0; // Placeholder for project number

function loadHomePage() {
  const content = document.querySelector("#content");

  const sideBarItems = sideBarData.map((itemData) =>
    createSideBarItem(itemData)
  );

  sideBarItems.forEach((item) => {
    projectNumber++;
    item.id = `project-${projectNumber}`;

    item.addEventListener("click", () => {
      // Handle sidebar item click
      console.log(
        `Clicked on: ${item.querySelector(".homeSidebarItemName").textContent}`
      );
      const homeMainContent = document.querySelector(".homeMainContentHeader");
      const displayContents = document.querySelector(".homeMainContentBody");
      displayContents.innerHTML = ""; // Clear previous content
      homeMainContent.innerHTML = ""; // Clear previous display content

      const currentProjectName = item.querySelector(
        ".homeSidebarItemName"
      ).textContent;
      const currentProjectData = sideBarData.find(
        (p) => p.name === currentProjectName
      );

      // Create Header for the Project and display it when clicked
      homeMainContent.appendChild(
        createElement("h2", {
          textContent: `Project: ${
            item.querySelector(".homeSidebarItemName").textContent
          } | Project ID: ${item.id}`,
          classList: "homeMainContentHeader",
        })
      );
      if (currentProjectData) {
        // Check if contents exist for the project and if yes, display them
        if (
          currentProjectData.contents &&
          Array.isArray(currentProjectData.contents)
        ) {
          currentProjectData.contents.forEach((contentItem, index) => {
            const tasksAndButtonContainer = createElement("div", {
              classList: "projectItemContainer",
            });
            const projectTaskButtonTargetContainer = createElement("div", {
              classList: "projectTaskButtonTargetContainer",
            });

            const newProjectTaskHeader = createElement("div", {
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

            displayContents.appendChild(newProjectTaskHeader);

            renderTasksaAndAddButton(
              contentItem,
              tasksAndButtonContainer,
              projectTaskButtonTargetContainer,
              item.id, // Pass the project ID to the render function
              index
            );
          });
        } else {
          // If no contents are available for the project, display a fallback message
          displayContents.appendChild(
            createElement("p", {
              textContent: "No content available for this project.",
              classList: "projectNoContent",
            })
          );
        }
      }
    });
  });

  const sideBar = createElement("div", {
    id: "sideBar",
    classList: "mainSideBar",
    children: [
      createElement("div", {
        classList: "sideBarHeader",
        children: [
          //Create the Header for the Sidebar
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
          //Adds the Projects for the Sidebar
          createElement("div", {
            classList: "homeSideBarItems",
            children: sideBarItems,
          }),
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
  const mainContent = createElement("div", {
    id: "mainContent",
    classList: "mainContent",
    children: [
      createElement("div", {
        classList: "homeMainContent",
        children: [
          createElement("div", {
            classList: "homeMainContentHeader",
            children: [],
          }),
          createElement("div", {
            classList: "homeMainContentBody",
            children: [
              createElement("p", {
                textContent:
                  "Welcome to the Home Page! Click on a project in the sidebar to view details.",
                classList: "homeMainContentText",
              }),
            ],
          }),
        ],
      }),
    ],
  });

  // Add mouse drag functionality to the main content
  content.appendChild(sideBar);
  content.appendChild(mainContent);
  handleMouseDrag();
}

export { loadHomePage };
// Function to load the home page content
