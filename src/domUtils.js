export function createElement(tag, options = {}) {
  const el = document.createElement(tag);

  if (options.classList) {
    if (Array.isArray(options.classList)) {
      options.classList.forEach((cls) => el.classList.add(cls));
    } else {
      el.classList.add(options.classList);
    }
  }

  if (options.textContent !== undefined) {
    el.textContent = options.textContent;
  }

  if (options.html !== undefined) {
    el.innerHTML = options.html;
  }

  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
  }

  // Only set placeholder and maxLength for input or textarea
  if (
    (tag === "input" || tag === "textarea") &&
    options.placeholder !== undefined
  ) {
    el.placeholder = options.placeholder;
  }

  if (
    (tag === "input" || tag === "textarea") &&
    options.maxLength !== undefined
  ) {
    el.maxLength = options.maxLength;
  }

  // Only set type for input
  if (tag === "input" && options.type !== undefined) {
    el.type = options.type;
  }

  // Only set src for img
  if (tag === "img" && options.src !== undefined) {
    el.src = options.src;
  }

  if (options.value !== undefined) {
    el.value = options.value;
  }

  if (options.children) {
    options.children.forEach((child) => {
      el.appendChild(child);
    });
  }

  return el;
}
