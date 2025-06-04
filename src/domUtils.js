export function createElement(tag, options = {}) {
  const el = document.createElement(tag);
  Object.entries(options).forEach(([key, value]) => {
    if (key === "classList") {
      if (Array.isArray(value)) {
        el.classList.add(...value);
      } else {
        el.classList.add(value);
      }
    } else if (key === "textContent") {
      el.textContent = value;
    } else if (key === "src") {
      el.src = value;
    } else if (key === "href") {
      el.href = value;
    } else if (key === "id") {
      el.id = value;
    } else if (key === "children" && Array.isArray(value)) {
      value.forEach((child) => {
        if (child) el.appendChild(child);
      });
    } else if (key === "attributes" && typeof value === "object") {
      Object.entries(value).forEach(([attrName, attrValue]) => {
        el.setAttribute(attrName, attrValue);
      });
    }
  });
  return el;
}
