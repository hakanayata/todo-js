// DOM ELEMENTS
const newTask = document.getElementById("new-task")
const addBtn = document.getElementById("add-btn")
const message = document.getElementById("message")
const listGroup = document.getElementById("list-group")
const list = document.getElementById("list")
const totalTasks = document.getElementById("total-tasks")
const tasksDone = document.getElementById("tasks-done")

// LOCAL STORAGE
let todo_list = JSON.parse(localStorage.getItem("todo_list")) ?? []
// console.log("start", todo_list)

// EVENTS
window.addEventListener('DOMContentLoaded', () => {
    if (todo_list.length > 0) {
        for (let i = 0; i < todo_list.length; i++) {
            if (todo_list[i] !== null) {
                createNewListItem(todo_list[i])
            }
        }
    }
    totalTasksUpdate()
    tasksDoneUpdate()
    hideListIfEmpty()
})

newTask.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        addBtn.click()
    }
})

let invalidInputCounter = 0;

addBtn.addEventListener('click', () => {

    let taskContent = newTask.value.trim()

    if (taskContent && taskContent !== '') {

        invalidInputCounter = 0

        // make div visible
        list.style.visibility = 'visible'

        // task obj
        const task = {
            "text": taskContent,
            "checked": false,
        }

        // create new list item
        createNewListItem(task)

        // add item to the array
        todo_list.push(task)

        // update total number of tasks
        totalTasksUpdate()

        // update localStorage
        storageUpdate(todo_list)

        // flush the input field
        newTask.value = ''
        message.textContent = ''
        message.style.visibility = 'hidden'

    } else {
        newTask.value = ''
        console.log("in", invalidInputCounter)
        if (invalidInputCounter > 0 && invalidInputCounter % 2 == 1) {
            message.classList.remove("alert-primary")
            message.classList.add("alert-danger")
        } else {
            if (message.classList.contains("alert-danger"))
                message.classList.remove("alert-danger")
        }
        invalidInputCounter++;
        console.log("out", invalidInputCounter)
        message.classList.add("alert-primary")
        message.textContent = "Invalid input!"
        message.style.visibility = 'visible'
    }
})

// FUNCTIONS
function createNewListItem(task) {
    // obj todo
    const todo = {
        "text": task.text,
        "checked": task.checked ?? false,
    }

    // new list item
    let new_task = document.createElement("li")
    new_task.setAttribute("class", "d-flex align-items-center justify-content-between list-group-item")
    new_task.textContent = todo.text
    if (todo.checked === true) {
        new_task.classList.add("checked")
    }

    // check mark button
    let new_check_button = document.createElement("button")
    new_check_button.setAttribute("class", "btn py-0")
    new_check_button.setAttribute("onclick", "onMarkDoneItemClick(this)")
    let new_check_icon = document.createElement("i")
    new_check_icon.setAttribute("class", "fa-regular fa-circle-check px-2")
    new_check_button.appendChild(new_check_icon)

    // trash mark button
    let new_trash_button = document.createElement("button")
    new_trash_button.setAttribute("class", "btn py-0")
    new_trash_button.setAttribute("onclick", "onDeleteItemClick(this)")
    let new_trash_icon = document.createElement("i")
    new_trash_icon.setAttribute("class", "fa-solid fa-trash px-2")
    new_trash_button.append(new_trash_icon)

    // buttons div
    let icon_div = document.createElement("div")
    icon_div.appendChild(new_check_button)
    icon_div.appendChild(new_trash_button)

    // append icon div to list item
    new_task.appendChild(icon_div)

    // add new list item to unordered list group
    listGroup.appendChild(new_task)
}

function hideListIfEmpty() {
    if (listGroup.innerText === '') {
        list.style.visibility = "hidden"
    } else {
        list.style.visibility = "visible"
    }
}

function onDeleteItemClick(item) {
    let item_to_delete = item.closest(".list-group-item")
    let content = item_to_delete.textContent
    // remove from DOM
    item_to_delete.remove()

    // remove from todo list
    todo_list = todo_list.filter(todo => todo.text != content)

    console.log(todo_list)
    storageUpdate(todo_list)
    totalTasksUpdate()
    tasksDoneUpdate()
    hideListIfEmpty()
}

function onMarkDoneItemClick(item) {
    item.closest(".list-group-item").classList.toggle("checked")
    // console.log(item.closest(".list-group-item").textContent)
    // toggle task's "checked" property on click
    for (const key of Object.keys(todo_list)) {
        if (todo_list[key].text === item.closest(".list-group-item").textContent) {
            todo_list[key].checked = !todo_list[key].checked
        }
    }
    storageUpdate(todo_list)
    tasksDoneUpdate()
}

function storageUpdate(list) {
    localStorage.setItem("todo_list", JSON.stringify(list))
}

function tasksDoneUpdate() {
    tasksDone.innerText = Array.from(document.querySelectorAll(".checked")).length
}

function totalTasksUpdate() {
    totalTasks.textContent = listGroup.childElementCount
}