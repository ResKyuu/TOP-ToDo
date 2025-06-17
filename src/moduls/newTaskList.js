import { createElement } from "../domUtils.js";

export function showNewTaskListModal() {
  return new Promise((resolve, reject) => {
    // Blur background
    const sideBar = document.getElementById("sideBar");
    const mainContent = document.getElementById("mainContent");
    if (sideBar) sideBar.classList.add("blurred");
    if (mainContent) mainContent.classList.add("blurred");

    // Overlay
    const overlay = createElement("div", { classList: "modalOverlay" });
    // Modal container
    const modal = createElement("div", { classList: "modalContainer" });

    // Modal content
    const title = createElement("h2", { textContent: "Add New Task List" });
    const input = createElement("input", {
      type: "text",
      placeholder: "Task List Name",
      classList: "modalInput",
    });
    // Validation message element
    const validationMsg = createElement("div", {
      classList: "modalValidationMsg",
      textContent: "",
    });
    const addButton = createElement("button", {
      textContent: "Add",
      classList: "modalAddButton",
    });
    const cancelButton = createElement("button", {
      textContent: "Cancel",
      classList: "modalCancelButton",
    });

    modal.appendChild(title);
    modal.appendChild(input);
    modal.appendChild(validationMsg);
    modal.appendChild(addButton);
    modal.appendChild(cancelButton);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Focus input for user convenience
    input.focus();

    function cleanup() {
      if (sideBar) sideBar.classList.remove("blurred");
      if (mainContent) mainContent.classList.remove("blurred");
      document.body.removeChild(overlay);
    }

    // Handle add
    addButton.addEventListener("click", () => {
      if (input.value.trim() !== "") {
        cleanup();
        resolve(input.value.trim());
      } else {
        validationMsg.textContent = "Task List Name cannot be empty.";
        validationMsg.style.color = "red";
        setTimeout(() => {
          validationMsg.textContent = "";
        }, 3000);
      }
    });

    // Handle cancel
    cancelButton.addEventListener("click", () => {
      cleanup();
      reject();
    });

    // Optional: handle Enter/Escape keys
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") addButton.click();
      if (e.key === "Escape") cancelButton.click();
    });
  });
}
