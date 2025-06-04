import "../styles/homeStyle.css";
import { createElement } from "../domUtils.js";
import sideBarData from "../Data/sidebarnav.json";

//svgs & icons
import arrowdown from "../svgs/arrowdown.svg";
import bell from "../svgs/bell.svg";
import dock from "../svgs/docksidebar.svg";
import profilePicture from "../images/profilepicture.jpg";
import hashtag from "../svgs/hashtag.svg";

//Builds the sidebar items from the sidebarnav.json Data
function createSideBarItem(item) {
  return createElement("div", {
    classList: "homeSideBarItem",
    children: [
      createElement("div", {
        classList: "homeSidebarItemIconContainer",
        children: [
          createElement("img", {
            src: hashtag,
            classList: "homeSidebarItemIcon",
            alt: item.alt,
          }),
        ],
      }),
      createElement("div", {
        classList: "homeSidebarItemText",
        children: [
          createElement("h3", {
            textContent: item.name,
            classList: "homeSidebarItemName",
          }),
        ],
      }),
    ],
  });
}

function loadHomePage() {
  const content = document.querySelector("#content");

  const sideBarItems = sideBarData.map((itemData) =>
    createSideBarItem(itemData)
  );

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
        ],
      }),
    ],
  });
  const mainContent = createElement("div", {
    id: "mainContent",
    classList: "mainContent",
    children: [],
  });

  content.appendChild(sideBar);
  content.appendChild(mainContent);
}

export { loadHomePage };
// Function to load the home page content
