import "../styles/homeStyle.css";
import { createElement } from "../domUtils.js";

//svgs & icons
import arrowdown from "../svgs/arrowdown.svg";
import bell from "../svgs/bell.svg";
import dock from "../svgs/docksidebar.svg";
import profilePicture from "../images/profilepicture.jpg";

function loadHomePage() {
  const content = document.querySelector("#content");

  const sideBar = createElement("div", {
    id: "sideBar",
    classList: "mainSideBar",
    children: [
      createElement("div", {
        classList: "sideBarHeader",
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
