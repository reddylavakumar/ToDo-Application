const addButton = document.getElementById("add-button");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const count = document.getElementById("pending-count");
const darkTheme = document.getElementById("dark-theme");
const lightTheme = document.getElementById("light-theme");
let todoData = [];
let currentId = 1;
let pendingTasks = 0;
function updatePendingCount() {
  pendingTasks = todoData.filter((item) => !item.completed);
  count.textContent = pendingTasks.length;
}

function createTodoItem(text) {
  const id = currentId++;
  const newTodo = { id: id, task: text, completed: false };
  todoData.push(newTodo);

  renderTodoList();
  updatePendingCount();
}

const sortThemeDark = document.getElementsByClassName("sort-theme")[0];

const sortThemeLight = document.getElementsByClassName("sort-theme")[1];

sortThemeLight.style.display = "none";

darkTheme.addEventListener("click", () => {
  const bodyTag = document.getElementsByTagName("body")[0];
  const todoCard = document.getElementsByClassName("todo-card")[0];
  sortThemeDark.style.display = "none";
  sortThemeLight.style.display = "flex";
  bodyTag.style.backgroundColor = "black";
  bodyTag.style.color = "white";
  todoCard.style.backgroundColor = "#2a342f";
});

lightTheme.addEventListener("click", () => {
  const bodyTag = document.getElementsByTagName("body")[0];
  const todoCard = document.getElementsByClassName("todo-card")[0];
  sortThemeLight.style.display = "none";
  sortThemeDark.style.display = "flex";
  bodyTag.style.backgroundColor = "#f0f2f5";
  bodyTag.style.color = "black";
  todoCard.style.backgroundColor = "white";
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

function renderTodoList() {
  list.innerHTML = "";

  todoData.map((todo) => {
    const li = document.createElement("li");
    li.setAttribute("data-id", todo.id);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.task;

    if (todo.completed) {
      span.classList.add("checked");
    }

    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      renderTodoList();
      updatePendingCount();
    });

    const clearButton = document.createElement("button");
    clearButton.className = "clear-button";
    clearButton.textContent = "X";

    clearButton.addEventListener("click", () => {
      todoData = todoData.filter((item) => item.id !== todo.id);
      renderTodoList();
      updatePendingCount();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(clearButton);
    list.appendChild(li);
  });
}
