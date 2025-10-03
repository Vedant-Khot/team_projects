// todo app functionality

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

document.addEventListener("DOMContentLoaded", loadTodos);
todoForm.addEventListener("submit", function (e) {
    e.preventDefault(); 
    addTodo(todoInput.value);
    todoInput.value = "";
});
// add new todo
function addTodo(text) {
    if (text.trim() === "") return;

    const todoItem = createTodoElement(text);

    todoList.appendChild(todoItem);
    saveTodos();
}

function createTodoElement(text, completed = false) {
    const li = document.createElement("li");
    li.className = "todo-item";
    if (completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.addEventListener("change", function () {
        li.classList.toggle("completed");
        saveTodos();
    });

    const span = document.createElement("span");
    span.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", function () {
        li.remove();
        saveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
}

function saveTodos() {
    const todos = [];
    document.querySelectorAll(".todo-item").forEach(item => {
        todos.push({
            text: item.querySelector("span").textContent,
            completed: item.classList.contains("completed")
        });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}
function loadTodos() {
    const saved = JSON.parse(localStorage.getItem("todos")) || [];
    saved.forEach(todo => {
        const todoItem = createTodoElement(todo.text, todo.completed);
        todoList.appendChild(todoItem);
    });
}
