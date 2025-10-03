//code for backend logic of todo list
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            <span style="cursor: pointer">${todo.text}</span>
            <button onclick="deleteTodo(${index})">Delete</button>
        `;
        
        const checkbox = li.querySelector('input');
        const span = li.querySelector('span');
        
        checkbox.addEventListener('change', () => toggleTodo(index));
        span.addEventListener('click', () => {
            toggleTodo(index);
            checkbox.checked = !checkbox.checked;
        });
        
        todoList.appendChild(li);
    });
}

function addTodo(text) {
    todos.push({ text, completed: false });
    saveTodos();
    renderTodos();
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        addTodo(text);
        todoInput.value = '';
    }
});

// Initial render
renderTodos();
