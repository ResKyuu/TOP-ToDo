import { createElement } from "../domUtils.js";
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

export { createSideBarItem };