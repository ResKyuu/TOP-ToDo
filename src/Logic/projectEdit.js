import { showEditProjectModal } from "../modals/editProject.js";

export function editProject(LOCAL_STORAGE_KEY, currentSideBarData, item) {
  const editIcon = item.querySelector(".editProjectIcon");
  if (editIcon) {
    editIcon.addEventListener("click", async (event) => {
      event.stopPropagation();
      const projectId = editIcon.getAttribute("data-project-id");
      const project = currentSideBarData.find((p) => p.id === projectId);
      if (!project) return;
      try {
        const newTitle = await showEditProjectModal(project.name);
        if (newTitle && newTitle !== project.name) {
          project.name = newTitle;
          localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify(currentSideBarData)
          );
          // Update sidebar UI
          item.querySelector(".homeSidebarItemName").textContent = newTitle;
        }
      } catch {
        // Modal cancelled
      }
    });
  }
}
