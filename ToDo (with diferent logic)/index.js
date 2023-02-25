const tasks = [
    {
        id: '1138465078061',
        completed: false,
        text: 'Watch JS lesson',
    },
    {


        id: '1138465078062',
        completed: false,
        text: 'Complete a test after the lesson',

    },
    {

        id: '1138465078063',
        completed: false,
        text: 'Do HW after test',

    },

]

function createTask(id, text) {
    const taskItemDiv = document.createElement('div');
    taskItemDiv.className = 'task-item';
    taskItemDiv.dataset.taskId = id;
    const tasksListDiv = document.querySelector('.tasks-list');
    tasksListDiv.append(taskItemDiv);

    const mainContainerDiv = document.createElement('div');
    mainContainerDiv.className = 'task-item__main-container';
    taskItemDiv.prepend(mainContainerDiv);

    const mainContentDiv = document.createElement('div');
    mainContentDiv.className = 'task-item__main-content';
    mainContainerDiv.prepend(mainContentDiv);

    const form = document.createElement('form');
    form.className = 'checkbox-form';
    mainContentDiv.append(form);

    const input = document.createElement('input');
    input.className = 'checkbox-form__checkbox';
    input.type = 'checkbox';
    input.id = `task-${id}`;
    form.prepend(input);

    const label = document.createElement('label');
    label.htmlFor = `task-${id}`;
    form.append(label);

    const span = document.createElement('span');
    span.className = 'task-item__text';
    span.innerText = text;
    mainContentDiv.append(span);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'task-item__delete-button default-button delete-button';
    deleteButton.dataset.deleteTaskId = id;
    deleteButton.innerText = 'Delete';
    mainContainerDiv.append(deleteButton);
}

const createErrorBlock = (message) => {
    const errorBlock = document.createElement('span');
    errorBlock.className = 'error-message-block';
    errorBlock.innerText = message;

    return errorBlock;
}

tasks.forEach(task => {
    createTask(task.id, task.text);
});

const createTaskForm = document.querySelector('.create-task-block');
const createTaskBlock = document.querySelector('.create-task-block');

createTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newTask = {};
    newTask.id = `${Date.now()}`;
    const input = document.querySelector('.create-task-block__input');
    const inputText = input.value;
    newTask.completed = false;
    newTask.text = inputText;
    const doesTaskExist = tasks.some((task) => task.text === inputText);
    const errorBlockFromDOM = document.querySelector('.error-message-block');

    if (!inputText) {
        const errorBlock = createErrorBlock('Task title should not be empty');
        createTaskBlock.append(errorBlock);
    } else if (doesTaskExist) {
        const errorBlock = createErrorBlock('This task title already exists');
        createTaskBlock.append(errorBlock);
    } else if (inputText || !doesTaskExist) {
        tasks.push(newTask);
        createTask(newTask.id, inputText);
    }

    if (errorBlockFromDOM) {
        errorBlockFromDOM.remove();
    }
})

const createModalOverlay = () => {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay modal-overlay_hidden';
    const deleteModal = document.createElement('div');
    deleteModal.className = 'delete-modal';
    modalOverlay.append(deleteModal);
    const deleteModalQuestion = document.createElement('h3');
    deleteModalQuestion.className = 'delete-modal__question';
    deleteModalQuestion.innerText = 'Do you really want to delete this task?';
    deleteModal.append(deleteModalQuestion);
    const deleteModalButtons = document.createElement('div');
    deleteModalButtons.className = 'delete-modal__buttons';
    deleteModal.append(deleteModalButtons);
    const cancelButton = document.createElement('button');
    cancelButton.className = 'delete-modal__button delete-modal__cancel-button';
    cancelButton.innerText = 'Cancel';
    deleteModalButtons.append(cancelButton);
    const confirmButton = document.createElement('button');
    confirmButton.className = 'delete-modal__button delete-modal__confirm-button';
    confirmButton.innerText = 'Yes';
    deleteModalButtons.append(confirmButton);

    return modalOverlay;
}

const tasksList = document.querySelector('.tasks-list');
const allDeleteButtons = document.querySelectorAll('.task-item__delete-button');

tasksList.addEventListener('click', (event) => {
    const isDeleteButton = event.target.closest('.delete-button');
    const taskItem = event.target.closest('.task-item');
    const taskId = taskItem.dataset.taskId;

    if (isDeleteButton) {
        const modalOverlay = createModalOverlay();
        const body = document.querySelector('body');
        modalOverlay.classList.remove('modal-overlay_hidden');
        body.append(modalOverlay);

        const cancelButton = modalOverlay.querySelector('.delete-modal__cancel-button');
        cancelButton.addEventListener('click', (event) => {
            modalOverlay.classList.add('modal-overlay_hidden');
        })

        const confirmButton = modalOverlay.querySelector('.delete-modal__confirm-button');
        confirmButton.addEventListener('click', (event) => {
            const taskIndexInArray = tasks.findIndex(task => task.id === taskId);

            if (taskIndexInArray >= 0) {
                tasks.splice(taskIndexInArray, 1)
                const taskToDelete = document.querySelector(`[data-task-id="${taskId}"]`);
                taskToDelete.remove();
                modalOverlay.classList.add('modal-overlay_hidden');
            }


        })

    }
})

let isDark = false;

function changeTheme({ bodyBackground, taskItemColor, buttonBorder, checkBoxBorder, }) {
    document.body.style.background = bodyBackground;

    const tasks = document.querySelectorAll('.task-item').forEach(task => task.style.color = taskItemColor);

    const buttons = document.querySelectorAll('button').forEach(button => button.style.border = buttonBorder);

    const checkBoxes = document.querySelectorAll('.checkbox-form__checkbox').forEach(checkBox => checkBox.style.border = checkBoxBorder);
}

window.addEventListener('keydown', (event) => {
    const { code } = event;
    if (code === 'Tab') {
        event.preventDefault();
        isDark = !isDark;

        if (isDark) {
            changeTheme({
                bodyBackground: '#24292E',
                taskItemTextColor: '#ffffff',
                buttonBorder: '1px solid #ffffff',
                checkBoxBorder: '0.5em solid #ffffff',
            })
        } else {
            changeTheme({
                bodyBackground: 'initial',
                taskItemTextColor: 'initial',
                buttonBorder: 'none',
                checkBoxBorder: 'initial',
            })
        }
    }

})
