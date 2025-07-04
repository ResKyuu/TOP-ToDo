import { createElement } from "../domUtils.js";

export function showNewTaskModal() {
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
    const title = createElement("h2", { textContent: "Add New Task" });
    const input = createElement("input", {
      type: "text",
      placeholder: "Task Name",
      classList: "modalInput",
    });
    const descriptionInput = createElement("textarea", {
      placeholder: "Task Description",
      classList: "modalDescriptionInput",
      maxLength: 198,
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
    modal.appendChild(descriptionInput);
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
        resolve({
          title: input.value.trim(),
          description: descriptionInput.value.trim(),
        });
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
