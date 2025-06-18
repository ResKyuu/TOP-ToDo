import { createElement } from "../domUtils.js";

export function showEditTaskModal(currentTitle, currentDescription) {
  return new Promise((resolve, reject) => {
    const sideBar = document.getElementById("sideBar");
    const mainContent = document.getElementById("mainContent");
    if (sideBar) sideBar.classList.add("blurred");
    if (mainContent) mainContent.classList.add("blurred");

    const overlay = createElement("div", { classList: "modalOverlay" });
    const modal = createElement("div", { classList: "modalContainer" });

    const title = createElement("h2", { textContent: "Edit Task" });
    const input = createElement("input", {
      type: "text",
      placeholder: "Task Name",
      classList: "modalInput",
      value: currentTitle,
    });
    const descriptionInput = createElement("textarea", {
      placeholder: "Task Description",
      classList: "modalDescriptionInput",
      value: currentDescription,
      maxLength: 198,
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
    modal.appendChild(descriptionInput);
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
        resolve({
          title: input.value.trim(),
          description: descriptionInput.value.trim(),
        });
      } else {
        validationMsg.textContent = "Task Name cannot be empty.";
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
