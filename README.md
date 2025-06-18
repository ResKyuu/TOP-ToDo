# TOP To-Do List

A modern, interactive To-Do List web application built with JavaScript and Webpack.  
This project was created as part of [The Odin Project](https://www.theodinproject.com/) curriculum.

---

## 🚀 Features

- **Project Organization:**  
  Create, edit, and delete multiple projects to keep your tasks organized by context or goal.

- **Task Lists:**  
  Each project can have multiple task lists (e.g., "Today", "Work", "Personal").  
  Task lists can be added, renamed, reprioritized, or deleted.

- **Tasks:**  
  Add, edit, and remove tasks within any task list.  
  Each task supports a title and description.

- **Prioritization:**  
  Assign priorities to task lists: _Default_, _Pending_, _Completed_, or _Overdue_.  
  Visual cues help you quickly identify the status of your lists.

- **Intuitive UI:**  
  - Sidebar navigation for quick project switching  
  - Drag-to-scroll for horizontal task list navigation  
  - Responsive, accessible modal dialogs for all actions  
  - Clean, modern design with smooth transitions

- **Persistence:**  
  All your data is stored in your browser’s `localStorage`—your projects and tasks are saved automatically.

---

## 🖥️ Demo

> **Try it live:**  
> [https://reskyuu.github.io/TOP-ToDo/](https://reskyuu.github.io/TOP-ToDo/)

---

## 📦 Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-github-username/TOP-ToDo.git
   cd TOP-ToDo
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run locally (development mode):**
   ```sh
   npm run dev
   ```

4. **Build for production:**
   ```sh
   npm run build
   ```

5. **Deploy to GitHub Pages:**
   ```sh
   npm run deploy
   ```

---

## 🛠️ Tech Stack

- **JavaScript (ES6+)**
- **Webpack** (modular bundling)
- **HTML5 & CSS3** (custom, no frameworks)
- **localStorage** (for persistent data)

---

## 📂 Project Structure

```
src/
  domUtils.js           # Utility for DOM element creation
  index.js              # App entry point
  template.html         # HTML template
  Data/
    projectData.json    # Default project/task data
  images/               # Profile and UI images
  Logic/                # Core logic (drag, edit, render, etc.)
  modals/               # Modal dialogs for all actions
  pages/                # Page-level logic
  styles/               # CSS styles
  svgs/                 # SVG icons
webpack.*.js            # Webpack configs
```

---

## 📝 About This Project

This To-Do List app was built as a capstone project for [The Odin Project](https://www.theodinproject.com/) JavaScript curriculum.  
It demonstrates modular JavaScript, DOM manipulation, state management, and modern UI/UX practices.

---

## 🙋‍♂️ Author

- [ResKyuu](https://github.com/ResKyuu)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---
