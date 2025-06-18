import { createElement } from "../domUtils.js";

export function showEditProjectModal(currentTitle) {
  return new Promise((resolve, reject) => {
    const sideBar = document.getElementById("sideBar");
    const mainContent = document.getElementById("mainContent");
    if (sideBar) sideBar.classList.add("blurred");
    if (mainContent) mainContent.classList.add("blurred");

    const overlay = createElement("div", { classList: "modalOverlay" });
    const modal = createElement("div", { classList: "modalContainer" });

    const title = createElement("h2", { textContent: "Edit Project Title" });
    const input = createElement("input", {
      type: "text",
      placeholder: "Project Name",
      classList: "modalInput",
      value: currentTitle,
      maxLength: 16,
    });
    const validationMsg = createElement("div", {
      classList: "modalValidationMsg",
      textContent: "",
    });
    const saveButton = createElement("button", {
      textContent: "Save",
      classList: "modalAddButton",
    });
    const cancelButton = createElement("button", {
      textContent: "Cancel",
      classList: "modalCancelButton",
    });

    modal.appendChild(title);
    modal.appendChild(input);
    modal.appendChild(validationMsg);
    modal.appendChild(saveButton);
    modal.appendChild(cancelButton);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    input.focus();

    function cleanup() {
      if (sideBar) sideBar.classList.remove("blurred");
      if (mainContent) mainContent.classList.remove("blurred");
      document.body.removeChild(overlay);
    }

    saveButton.addEventListener("click", () => {
      if (input.value.trim() !== "") {
        cleanup();
        resolve(input.value.trim());
      } else {
        validationMsg.textContent = "Project Name cannot be empty.";
        validationMsg.style.color = "red";
        setTimeout(() => {
          validationMsg.textContent = "";
        }, 3000);
      }
    });

    cancelButton.addEventListener("click", () => {
      cleanup();
      reject();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") saveButton.click();
      if (e.key === "Escape") cancelButton.click();
    });
  });
}
