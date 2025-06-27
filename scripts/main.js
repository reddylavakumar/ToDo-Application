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
const inputEdit = document.createElement("input");

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
  inputEdit.style.background = "black";
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
  inputEdit.style.background = "white";
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

    // const span = document.createElement("span");
    // with out edit
    // span.className = "todo-text";
    // span.textContent = todo.task;
    // if (todo.completed) span.classList.add("checked");
    // with edit
    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.task;
    if (todo.completed) span.classList.add("checked");

    // onclick edit with input field
    span.addEventListener("click", () => {
      inputEdit.value = todo.task;
      inputEdit.className = "todo-edit-input";

      inputEdit.style.width = `${span.offsetWidth}px`;
      inputEdit.style.font = window.getComputedStyle(span).font;
      inputEdit.style.resize = "none";

      span.replaceWith(inputEdit);
      inputEdit.focus();
      inputEdit.setSelectionRange(
        inputEdit.value.length,
        inputEdit.value.length
      );

      const saveEdit = () => {
        const newValue = inputEdit.value.trim();
        if (newValue !== "") {
          todo.task = newValue;
          saveTodos();
          renderTodoList();
        } else {
          renderTodoList();
        }
      };

      inputEdit.addEventListener("blur", saveEdit);
      inputEdit.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          saveEdit();
        }
      });
    });

    // ---------------------end of edit-------------
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
