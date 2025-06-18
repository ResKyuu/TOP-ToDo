import { createElement } from "../domUtils.js";
import hashtag from "../svgs/hashtag.svg";
import trash from "../svgs/trash.svg";
import edit from "../svgs/edit.svg";

//Builds the sidebar items from the sidebarnav.json Data
function createSideBarItem(item) {
  return createElement("div", {
    classList: "homeSideBarItem",
    children: [
      createElement("div", {
        classList: "homeSidebarItemIconContainer",
        children: [
          createElement("div", {
            classList: "homeSidebarItemIconContainerLeft",
            children: [
              createElement("img", {
                src: hashtag,
                classList: "homeSidebarItemIcon",
                alt: item.alt,
              }),
            ],
          }),
          createElement("div", {
            classList: "homeSidebarItemIconContainerRight",
            children: [
              createElement("img", {
                src: edit,
                classList: "editProjectIcon",
                alt: "Edit Project Icon",
                attributes: { "data-project-id": item.id },
              }),
              createElement("img", {
                src: trash,
                classList: "deleteProjectIcon",
                alt: "Delete Project Icon",
                attributes: { "data-project-id": item.id },
              }),
            ],
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
