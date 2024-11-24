document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.querySelector('#addSpan input[type="text"]');
    const dateInput = document.querySelector('#addSpan input[type="date"]');
    const addBtn = document.getElementById('addBtn');
    const searchInput = document.getElementById('site-search');
    const taskContainer = document.getElementById('card');

    loadTasks();

    addBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const dueDate = dateInput.value;

        if (validateTask(taskText, dueDate)) {
            const task = { text: taskText, dueDate, completed: false };
            addTask(task);
            saveTask(task);
            taskInput.value = '';
            dateInput.value = '';
        }
    });

    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value.trim().toLowerCase();
        filterTasks(searchText);
    });

    function validateTask(text, date) {
        const today = new Date().toISOString().split('T')[0];
        const dateIsValid = !date || date >= today;

        if (text.length < 3 || text.length > 255) {
            alert('Zadanie musi mięc wiecej niz 3 i mniej niz 255 litery.');
            return false;
        }
        if (!dateIsValid) {
            alert('Zła data.');
            return false;
        }
        return true;
    }

    function addTask(task) {
        const taskElement = document.createElement('span');
        taskElement.classList.add('task');

        taskElement.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} />
            <span class="task-text">${task.text}</span>
            <svg class="delete-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="float: right; margin-left: 30px;">
                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
            </svg>
            <span class="task-date" style="float: right;">${task.dueDate}</span>
        `;

        const textSpan = taskElement.querySelector('.task-text');
        const dateSpan = taskElement.querySelector('.task-date');

        textSpan.addEventListener('click', () => editTask(textSpan, 'text'));
        dateSpan.addEventListener('click', () => editTask(dateSpan, 'date'));

        const deleteBtn = taskElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            taskElement.remove();
            removeTask(task.text);
        });

        taskContainer.insertBefore(taskElement, document.getElementById('addSpan'));
    }

    function filterTasks(query) {
        const tasks = taskContainer.querySelectorAll('.task');
        tasks.forEach(task => {
            const textSpan = task.querySelector('span');
            const text = textSpan.textContent.toLowerCase();
            task.style.display = text.includes(query) ? '' : 'none';

            if (query && text.includes(query)) {
                const highlightedText = text.replace(new RegExp(query, 'gi'), match => `<mark>${match}</mark>`);
                textSpan.innerHTML = highlightedText;
            } else {
                textSpan.innerHTML = textSpan.textContent;
            }
        });
    }



    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(addTask);
    }

    function saveTask(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTask(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    function updateTask(taskElement, type, newValue) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const text = taskElement.querySelector('.task-text').textContent;
        const date = taskElement.querySelector('.task-date').textContent;

        const updatedTasks = tasks.map(task => {
            if (task.text === text || task.dueDate === date) {
                if (type === 'text') task.text = newValue;
                if (type === 'date') task.dueDate = newValue;
            }
            return task;
        });

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    function editTask(spanElement, type) {
        const input = document.createElement('input');
        input.type = type === 'text' ? 'text' : 'date';
        input.value = spanElement.textContent;

        spanElement.replaceWith(input);
        input.focus();

        input.addEventListener('blur', () => {
            const newValue = input.value;
            spanElement.textContent = newValue || (type === 'date' ? '' : spanElement.textContent);
            input.replaceWith(spanElement);
            updateTask(spanElement.closest('.task'), type, newValue);
        });
    }
});
