document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    
    // Загрузка задач из localStorage
    loadTasks();
    
    // Добавление задачи
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        
        // Создание элемента задачи
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        
        const taskSpan = document.createElement('span');
        taskSpan.className = 'task-text';
        taskSpan.textContent = taskText;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Удалить';
        
        // Добавление обработчиков событий
        taskSpan.addEventListener('click', toggleTask);
        deleteBtn.addEventListener('click', deleteTask);
        
        // Сборка элемента
        taskItem.appendChild(taskSpan);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
        
        // Очистка поля ввода
        taskInput.value = '';
        
        // Сохранение задач
        saveTasks();
    }
    
    function toggleTask(e) {
        const taskText = e.target;
        taskText.classList.toggle('completed');
        saveTasks();
    }
    
    function deleteTask(e) {
        const taskItem = e.target.parentElement;
        taskList.removeChild(taskItem);
        saveTasks();
    }
    
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(taskItem => {
            const text = taskItem.querySelector('.task-text').textContent;
            const completed = taskItem.querySelector('.task-text').classList.contains('completed');
            tasks.push({ text, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            
            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.className = 'task-item';
                
                const taskSpan = document.createElement('span');
                taskSpan.className = 'task-text';
                taskSpan.textContent = task.text;
                if (task.completed) {
                    taskSpan.classList.add('completed');
                }
                
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = 'Удалить';
                
                taskSpan.addEventListener('click', toggleTask);
                deleteBtn.addEventListener('click', deleteTask);
                
                taskItem.appendChild(taskSpan);
                taskItem.appendChild(deleteBtn);
                taskList.appendChild(taskItem);
            });
        }
    }
});