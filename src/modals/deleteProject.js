import { createElement } from "../domUtils.js";

export function showDeleteTaskListModal() {
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
    const message = createElement("h2", {
      textContent: "Are you sure you want to delete this Project?",
      style: "text-align:center; margin-bottom: 1rem;",
    });
    const confirmButton = createElement("button", {
      textContent: "Confirm",
      classList: "modalAddButton",
    });
    const cancelButton = createElement("button", {
      textContent: "Cancel",
      classList: "modalCancelButton",
    });

    // Nest both buttons in a single div
    const buttonContainer = createElement("div", {
      classList: "modalButtonContainer",
      children: [confirmButton, cancelButton],
    });

    modal.appendChild(message);
    modal.appendChild(buttonContainer);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    function cleanup() {
      if (sideBar) sideBar.classList.remove("blurred");
      if (mainContent) mainContent.classList.remove("blurred");
      document.body.removeChild(overlay);
    }

    confirmButton.addEventListener("click", () => {
      cleanup();
      resolve(true);
    });

    cancelButton.addEventListener("click", () => {
      cleanup();
      reject();
    });

    // Optional: handle Escape key
    document.addEventListener("keydown", function escHandler(e) {
      if (e.key === "Escape") {
        cleanup();
        document.removeEventListener("keydown", escHandler);
        reject();
      }
    });
  });
}
