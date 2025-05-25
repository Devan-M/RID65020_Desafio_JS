const todoForm = document.getElementById('create-todo-form');
const taskField = document.getElementById('task-field');
const tagField = document.getElementById('tag-field');
const todoList = document.getElementById('todo-list');
const doneCounter = document.getElementById('done-counter');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Adiciona tarefas iniciais se for a primeira execução (localStorage vazio)
if (tasks.length === 0) {
    const hoje = new Date().toLocaleDateString('pt-BR');
    tasks = [
        { name: 'Implementar tela de listagem de tarefas', tag: 'frontend', date: '21/08/2024', done: false },
        { name: 'Criar endpoint para cadastro de tarefas', tag: 'backend', date: '21/08/2024', done: false },
        { name: 'Implementar protótipo da listagem de tarefas', tag: 'ux', date: '21/08/2024', done: true }
    ];
    saveTasks(); // salva no localStorage
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateDoneCounter() {
    const doneCount = tasks.filter(task => task.done).length;
    doneCounter.textContent = `${doneCount} tarefa${doneCount !== 1 ? 's' : ''} concluída${doneCount !== 1 ? 's' : ''}`;
}

function renderTasks() {
    todoList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        if (task.done) li.classList.add('done');

        li.innerHTML = `
            <div class="task-text-group">
                <span class="task-name">${task.name}</span>
                <div class="task-meta">
                    <span class="task-tag">${task.tag || 'sem-etiqueta'}</span>
                    <span class="task-date">Criado em: ${task.date}</span>
                </div>
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

        li.querySelector('.toggle-task-btn').addEventListener('click', () => {
            tasks[index].done = !tasks[index].done;
            saveTasks();
            renderTasks();
        });

        todoList.appendChild(li);
    });

    updateDoneCounter();
    if (window.lucide) lucide.createIcons();
}

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = taskField.value.trim();
    const tag = tagField.value.trim();
    const date = new Date().toLocaleDateString('pt-BR');

    if (name === '') return;

    tasks.push({ name, tag, date, done: false });
    saveTasks();
    renderTasks();

    taskField.value = '';
    tagField.value = '';
});

renderTasks();
