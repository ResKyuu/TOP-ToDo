export function deleteProject(LOCAL_STORAGE_KEY, item, currentSideBarData) {
  const deleteIcon = item.querySelector(".deleteProjectIcon");
  if (deleteIcon) {
    deleteIcon.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent the click from bubbling up to the item click handler.
      const projectId = deleteIcon.getAttribute("data-project-id");
      const projectIndex = currentSideBarData.findIndex(
        (project) => project.id === projectId
      );
      if (projectIndex !== -1) {
        currentSideBarData.splice(projectIndex, 1); // Remove the project from the array.
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(currentSideBarData)
        ); // Update localStorage.
        item.remove(); // Remove the item from the sidebar.
        alert("Project deleted successfully!");
      } else {
        console.error("Project not found for deletion:", projectId);
      }
    });
  }
}
