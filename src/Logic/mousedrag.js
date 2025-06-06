function handleMouseDrag() {
  const slider = document.querySelector(".homeMainContentBody");

  if (!slider) {
    console.error("Slider element .mainContent not found for mouse drag.");
    return;
  }

  let isDown = false;
  let startX;
  let scrollLeftAtMouseDown;

  const endDrag = () => {
    if (!isDown) return; // Ensure cleanup runs only once
    isDown = false;
    // slider.classList.remove('dragging'); // Optional: remove dragging class

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", endDrag);
    document.documentElement.removeEventListener("mouseleave", endDrag); // Remove mouseleave listener
  };

  const onMouseDown = (e) => {
    // Only proceed for the main mouse button (usually left button)
    if (e.button !== 0) return;

    isDown = true;
    // slider.classList.add('dragging'); // Optional: add dragging class for styling
    startX = e.pageX - slider.offsetLeft;
    scrollLeftAtMouseDown = slider.scrollLeft;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", endDrag);
    // Add listener for mouse leaving the document boundaries
    document.documentElement.addEventListener("mouseleave", endDrag);
  };

  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault(); // Prevent text selection, etc.
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeftAtMouseDown - walk;
  };

  // Initial event listener on the slider
  slider.addEventListener("mousedown", onMouseDown);
}

export { handleMouseDrag };
