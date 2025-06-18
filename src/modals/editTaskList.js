import { createElement } from "../domUtils.js";

export function showEditTaskListModal(
  currentTitle,
  currentPriority = "default"
) {
  return new Promise((resolve, reject) => {
    const sideBar = document.getElementById("sideBar");
    const mainContent = document.getElementById("mainContent");
    if (sideBar) sideBar.classList.add("blurred");
    if (mainContent) mainContent.classList.add("blurred");

    const overlay = createElement("div", { classList: "modalOverlay" });
    const modal = createElement("div", { classList: "modalContainer" });

    const title = createElement("h2", { textContent: "Edit Task List Title" });
    const input = createElement("input", {
      type: "text",
      placeholder: "Task List Name",
      classList: "modalInput",
      value: currentTitle,
      maxLength: 16,
    });

    // Priority selector
    const priorityLabel = createElement("label", {
      textContent: "Priority:",
      attributes: { for: "priority-select" },
    });
    const prioritySelect = createElement("select", {
      classList: "modalPrioritySelect",
      attributes: { id: "priority-select" },
    });
    ["default", "pending", "completed", "overdue"].forEach((state) => {
      const option = createElement("option", {
        value: state,
        textContent: state.charAt(0).toUpperCase() + state.slice(1),
      });
      if (state === currentPriority) option.selected = true;
      prioritySelect.appendChild(option);
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
    modal.appendChild(priorityLabel);
    modal.appendChild(prioritySelect);
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
          priority: prioritySelect.value,
        });
      } else {
        validationMsg.textContent = "Task List Name cannot be empty.";
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
