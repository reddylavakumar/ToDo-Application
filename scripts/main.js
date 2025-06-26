// const addButton = document.getElementById("add-button");
// const input = document.getElementById("todo-input");
// const list = document.getElementById("todo-list");
// const count = document.getElementById("pending-count");
// const darkTheme = document.getElementById("dark-theme");
// const lightTheme = document.getElementById("light-theme");
// const filtersortIcon = document.getElementById("filterandsort");
// const filtersortIconDark = document.getElementById("filterandsortdark");
// filtersortIconDark.style.display = "none";
// lightTheme.style.display = "none";

// let value2 = "all";
// let value3 = value2;
// function getActiveSelectElement() {
//   return sortThemeDark.style.display === "none"
//     ? sortThemeLight.querySelector(".selectfield")
//     : sortThemeDark.querySelector(".selectfield");
// }

// let todoData = [];
// let currentId = 1;
// let pendingTasks = 0;
// function updatePendingCount() {
//   pendingTasks = todoData.filter((item) => !item.completed);
//   count.textContent = pendingTasks.length;
// }

// function createTodoItem(text) {
//   const id = currentId++;
//   const newTodo = {
//     id: id,
//     task: text,
//     completed: false,
//     createdAt: new Date().toISOString(), // <-- add this
//   };
//   todoData.push(newTodo);

//   renderTodoList();
//   updatePendingCount();
// }

// // const sortThemeDark = document.getElementsByClassName("sort-theme")[0];

// darkTheme.addEventListener("click", () => {
//   const bodyTag = document.getElementsByTagName("body")[0];
//   const todoCard = document.getElementsByClassName("todo-card")[0];
//   filtersortIcon.style.display = "none";
//   // sortThemeDark.style.display = "none";
//   lightTheme.style.display = "flex";
//   bodyTag.style.backgroundColor = "black";
//   bodyTag.style.color = "white";
//   todoCard.style.backgroundColor = "#2a342f";
//   // getActiveSelectElement().style.background = "black";
//   document.getElementById("filter-sort-select-dark").value = value2;
// });

// lightTheme.addEventListener("click", () => {
//   const bodyTag = document.getElementsByTagName("body")[0];
//   const todoCard = document.getElementsByClassName("todo-card")[0];
//   filtersortIcon.style.display = "flex";

//   // sortThemeLight.style.display = "none";
//   // sortThemeDark.style.display = "flex";
//   bodyTag.style.backgroundColor = "#f0f2f5";
//   bodyTag.style.color = "black";
//   todoCard.style.backgroundColor = "white";
//   // getActiveSelectElement().style.background = "white";
//   document.getElementById("filter-sort-select").value = value3;
// });

// addButton.addEventListener("click", () => {
//   const task = input.value.trim();
//   if (task !== "") {
//     createTodoItem(task);
//     input.value = "";
//   }
// });

// input.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") {
//     addButton.click();
//   }
// });

// function renderTodoList() {
//   value2 = document.getElementById("filter-sort-select").value;
//   value3 = document.getElementById("filter-sort-select-dark").value;

//   list.innerHTML = "";

//   const filterValue = getActiveSelectElement().value || "all";
//   const todosToRender = getFilteredSortedTodos(filterValue);

//   todosToRender.forEach((todo) => {
//     const li = document.createElement("li");
//     li.setAttribute("data-id", todo.id);

//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     checkbox.checked = todo.completed;

//     const span = document.createElement("span");
//     span.className = "todo-text";
//     span.textContent = todo.task;

//     if (todo.completed) {
//       span.classList.add("checked");
//     }

//     checkbox.addEventListener("change", () => {
//       todo.completed = checkbox.checked;
//       renderTodoList();
//       updatePendingCount();
//     });

//     const clearButton = document.createElement("button");
//     clearButton.className = "clear-button";
//     clearButton.textContent = "X";

//     clearButton.addEventListener("click", () => {
//       todoData = todoData.filter((item) => item.id !== todo.id);
//       renderTodoList();
//       updatePendingCount();
//     });

//     li.appendChild(checkbox);
//     li.appendChild(span);
//     li.appendChild(clearButton);
//     list.appendChild(li);
//   });
//   console.log(value2, "val 2");
//   console.log(value3, "val 3");
// }

// function getFilteredSortedTodos(option) {
//   let data = [...todoData];

//   if (option === "completed") {
//     data = data.filter((todo) => todo.completed);
//   } else if (option === "pending") {
//     data = data.filter((todo) => !todo.completed);
//   } else if (option === "az") {
//     data.sort((a, b) => a.task.localeCompare(b.task));
//   } else if (option === "za") {
//     data.sort((a, b) => b.task.localeCompare(a.task));
//   } else if (option === "newest") {
//     data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//   } else if (option === "oldest") {
//     data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//   }

//   return data;
// }

// const allSelectFields = document.querySelectorAll(".selectfield");
// allSelectFields.forEach((selectEl) => {
//   selectEl.addEventListener("change", () => {
//     renderTodoList();
//   });
// });
// function saveTodos() {
//   localStorage.setItem("todos", JSON.stringify(todoData));
// }

// function loadTodos() {
//   const stored = localStorage.getItem("todos");
//   if (stored) {
//     todoData = JSON.parse(stored);
//     currentId = Math.max(0, ...todoData.map((todo) => todo.id)) + 1;
//     renderTodoList();
//     updatePendingCount();
//   }
// }

// loadTodos();

// // value2 = document.getElementById("filter-sort-select").value;

// // console.log(value2, "val 2");

const addButton = document.getElementById("add-button");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const count = document.getElementById("pending-count");

const darkTheme = document.getElementById("dark-theme");
const lightTheme = document.getElementById("light-theme");
const filtersortIcon = document.getElementById("filterandsort");
const filtersortIconDark = document.getElementById("filterandsortdark");

const filterSortSelect = document.getElementById("filter-sort-select");

filtersortIconDark.style.display = "none";
lightTheme.style.display = "none";

let todoData = [];
let currentId = 1;

darkTheme.addEventListener("click", () => {
  document.body.style.backgroundColor = "black";
  document.body.style.color = "white";
  document.querySelector(".todo-card").style.backgroundColor = "#2a342f";

  filtersortIcon.style.display = "none";
  filtersortIconDark.style.display = "inline";
  darkTheme.style.display = "none";
  lightTheme.style.display = "inline";
  filterSortSelect.style.background = "black";
});

lightTheme.addEventListener("click", () => {
  document.body.style.backgroundColor = "#f0f2f5";
  document.body.style.color = "black";
  document.querySelector(".todo-card").style.backgroundColor = "white";

  filtersortIcon.style.display = "inline";
  filtersortIconDark.style.display = "none";
  darkTheme.style.display = "inline";
  lightTheme.style.display = "none";
  filterSortSelect.style.background = "white";
});

addButton.addEventListener("click", () => {
  const task = input.value.trim();
  if (task !== "") {
    createTodoItem(task);
    input.value = "";
  }
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addButton.click();
  }
});

function createTodoItem(text) {
  const newTodo = {
    id: currentId++,
    task: text,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todoData.push(newTodo);
  saveTodos();
  renderTodoList();
  updatePendingCount();
}

function renderTodoList() {
  const filterValue = filterSortSelect.value || "all";
  const todosToRender = getFilteredSortedTodos(filterValue);

  list.innerHTML = "";
  todosToRender.forEach((todo) => {
    const li = document.createElement("li");
    li.setAttribute("data-id", todo.id);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.task;
    if (todo.completed) span.classList.add("checked");

    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodoList();
      updatePendingCount();
    });

    const clearButton = document.createElement("button");
    clearButton.className = "clear-button";
    clearButton.textContent = "X";
    clearButton.addEventListener("click", () => {
      todoData = todoData.filter((item) => item.id !== todo.id);
      saveTodos();
      renderTodoList();
      updatePendingCount();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(clearButton);
    list.appendChild(li);
  });
}

function getFilteredSortedTodos(option) {
  let data = [...todoData];

  if (option === "completed") {
    data = data.filter((todo) => todo.completed);
  } else if (option === "pending") {
    data = data.filter((todo) => !todo.completed);
  } else if (option === "az") {
    data.sort((a, b) => a.task.localeCompare(b.task));
  } else if (option === "za") {
    data.sort((a, b) => b.task.localeCompare(a.task));
  } else if (option === "newest") {
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (option === "oldest") {
    data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  return data;
}

function updatePendingCount() {
  const pendingTasks = todoData.filter((item) => !item.completed).length;
  count.textContent = pendingTasks;
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todoData));
}

function loadTodos() {
  const stored = localStorage.getItem("todos");
  if (stored) {
    todoData = JSON.parse(stored);
    currentId = Math.max(0, ...todoData.map((todo) => todo.id)) + 1;
    renderTodoList();
    updatePendingCount();
  }
}

filterSortSelect.addEventListener("change", () => {
  renderTodoList();
});

loadTodos();
