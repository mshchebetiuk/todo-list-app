const input = document.querySelector('.todo__input');
const button = document.querySelector('.todo__button');
const list = document.querySelector('.todo__list');
const count = document.querySelector('.todo__count');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

render();

button.addEventListener('click', addTodo);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTodo();
});

function addTodo() {
    const text = input.value.trim();
    if (!text) return; 

    todos.push({
        id: Date.now(),
        text,
        done: false,
    });

    input.value = '';
    saveAndRender();
}

function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    saveAndRender();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('todos', JSON.stringify(todos));
    render();
}

function render() {
    list.textContent = '';
    count.textContent = todos.length;

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo__item';
        if (todo.done) li.classList.add('todo__item--done');

        const span = document.createElement('span');
        span.textContent = todo.text;
        span.addEventListener('click', () => toggleTodo(todo.id));

        const btn = document.createElement('button');
        btn.textContent = '[X]';
        btn.className = 'todo__delete';
        btn.addEventListener('click', () => deleteTodo(todo.id));

        li.append(span, btn);
        list.appendChild(li);
    });
}