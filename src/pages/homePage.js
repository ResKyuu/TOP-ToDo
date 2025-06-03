import "../styles/homeStyle.css";
import { createElement } from "../domUtils.js";

function loadHomePage() {
  const content = document.querySelector("#content");

  const sideBar = createElement("div", {
    id: "sideBar",
    classList: "mainSideBar",
    children: [],
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
