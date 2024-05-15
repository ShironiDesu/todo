const taskList = document.querySelector('.todos')
const createTaskBtn = document.querySelector('.add-btn')
const taskTitleInput = document.querySelector('.add-input')
const clearText = document.querySelector('.clear-text')
const clearBtn = document.querySelector('.clear-btn')
const dateInput = document.querySelector(".date-input")
const radioInput = document.querySelectorAll('.rad')
const selectElement = document.getElementById('mySelect');
// const selects = document.querySelectorAll('.selects')
const taskListArr = JSON.parse(localStorage.getItem('Tasks')) || []
const insertTask = (newElem) => {
    taskList.insertAdjacentHTML("afterbegin", newElem) // добавляет элемент после и до тэга, и до и после внутри тэга

}

const count = () => {
    clearText.textContent = `You have ${taskListArr.length} pending tasks`
}
const createTask = () => {
    const taskTitle = taskTitleInput.value
    const selectedDate = new Date(dateInput.value);
    const curDate = new Date()
    const timeDiff = selectedDate.getTime() - curDate.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    // console.log(daysRemaining);
    let selectedRadio = '';


    const selectedOption = selectElement.options[selectElement.selectedIndex];

    selectedSelectText = selectedOption.textContent;


    if (taskTitle.length > 1 && timeDiff >= 0) {


        // return
        const newElem = `
        <li>
            <div class="priorety"></div>
    
            <span class="text"> ${taskTitle} </span>
            <span class='user'>User: ${selectedSelectText}</span>
            <span> Осталось: ${daysRemaining} дней. </span>
            <button class="delete-btn">X</button>
        </li>
        `;
        taskListArr.push(newElem)
        localStorage.setItem("Tasks", JSON.stringify(taskListArr))
        insertTask(newElem)
        taskTitleInput.value = ""
        const dateRofl = daysRemaining
        count()

        if (dateRofl == 1) {
            const text = document.querySelector('.text')
            text.style.color = 'red'
        }
        const prioretyElem = document.querySelector('.priorety')

        // const red = document.querySelector('.red')
        // const yellow = document.querySelector('.yellow')
        // const green = document.querySelector('.green')
        radioInput.forEach(radioBtn => {
            if (radioBtn.checked) {
                selectedRadio = radioBtn.value;

                if (selectedRadio == "High") {
                    prioretyElem.style.backgroundColor = 'red'
                } else if (selectedRadio == "Medium") {
                    prioretyElem.style.backgroundColor = 'yellow'
                } else if (selectedRadio == "Low") {
                    prioretyElem.style.backgroundColor = 'green'
                }

            }
        });


    } else {
        alert("Введите  корректную дату")
    }


}

const deleteTask = (event) => {
    const target = event.target
    const deleteBtn = target.closest('.delete-btn')
    const taskItem = target.closest('li');
    if (deleteBtn) {
        const taskIndex = Array.from(taskList.children).indexOf(deleteBtn.parentElement)
        // Удаляем элемент по его индексу
        taskListArr.splice(taskIndex, 1)
        localStorage.setItem("Tasks", JSON.stringify(taskListArr))
        deleteBtn.parentElement.remove()
        count()
    }
    if (taskItem) {
        taskItem.classList.toggle('done');
    }
    count()
}

const init = () => {

    if (taskListArr.length > 0) {
        taskListArr.map((task) => {
            insertTask(task)

        })

    }
    count()
}

const clearAll = () => {
    localStorage.clear()
    taskListArr.length = 0
    taskList.innerHTML = ""
    count()
}


const searchUser = () => {
    const mySearch = document.querySelector('#mySearch');
    const mySearchValue = mySearch.value.toLowerCase();
    const userTasks = taskList.querySelectorAll('.user');


    userTasks.forEach(userTask => {
        const userName = userTask.textContent.toLowerCase();
        if (userName.includes(mySearchValue)) {
            userTask.parentElement.style.display = '';
        } else {
            userTask.parentElement.style.display = 'none';
        }
    });
}

const mySearch = document.querySelector('#mySearch');
mySearch.addEventListener('input', searchUser);

clearBtn.addEventListener('click', clearAll)
createTaskBtn.addEventListener('click', createTask)
taskList.addEventListener('click', deleteTask)

window.addEventListener("DOMContentLoaded", init) // Когда DOM дерево прогрузится  у пользователя, сработает это событие 
console.log(taskListArr);