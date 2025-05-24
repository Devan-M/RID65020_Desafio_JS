// Seleciona os elementos do DOM
const todoForm = document.getElementById('create-todo-form');
const taskField = document.getElementById('task-field');
const tagField = document.getElementById('tag-field');
const todoList = document.getElementById('todo-list');

// Lista de tarefas
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Salva as tarefas no localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Renderiza as tarefas na tela
function renderTasks() {
    todoList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        if (task.done) li.classList.add('done');

        li.innerHTML = `
            <div class="task-info">
                <span class="task-name">${task.name}</span>
                <span class="task-tag">#${task.tag}</span>
            </div>
            ${
                task.done
                    ? `<button class="toggle-task-btn checked-btn" aria-label="Tarefa concluída">
                            <i data-lucide="check" class="icon"></i>
                       </button>`
                    : `<button class="toggle-task-btn mark-done-btn" aria-label="Marcar como concluída">
                            Concluir
                       </button>`
            }
        `;

        const btn = li.querySelector('.toggle-task-btn');
        btn.addEventListener('click', () => {
            tasks[index].done = !tasks[index].done;
            saveTasks();
            renderTasks();
        });

        todoList.appendChild(li);
    });

    // Renderiza ícones (Lucide)
    if (window.lucide) lucide.createIcons();
}

// Adiciona nova tarefa
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = taskField.value.trim();
    const tag = tagField.value.trim();

    if (name === '') return;

    tasks.push({ name, tag, done: false });
    saveTasks();
    renderTasks();

    taskField.value = '';
    tagField.value = '';
});

// Remove tarefas concluídas
function removeDoneTasks() {
    tasks = tasks.filter(task => !task.done);
    saveTasks();
    renderTasks();
}

// Inicializa a renderização
renderTasks();
