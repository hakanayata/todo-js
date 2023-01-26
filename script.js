const newTask = document.getElementById("new-task")
const addBtn = document.getElementById("add-btn")
const message = document.getElementById("message")
const listGroup = document.getElementById("list-group")
const list = document.getElementById("list")
const totalTasks = document.getElementById("total-tasks")
const tasksDone = document.getElementById("tasks-done")

let idNoList = []
let idNo = 0

let todoCounter = 0
let markedDone = 0

function hideListIfEmpty() {
    if (listGroup.innerText === '') {
        list.style.visibility = "hidden"
    } else {
        list.style.visibility = "visible"
    }
}

window.addEventListener('DOMContentLoaded', () => {
    hideListIfEmpty()
})

newTask.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        addBtn.click()
    }
})

addBtn.addEventListener('click', () => {

    let newTaskContent = newTask.value.trim()

    if (newTaskContent && newTaskContent !== '') {
        if (document.getElementById("place-holder-item")) {
            document.getElementById("place-holder-item").remove()
        }

        // make div visible
        list.style.visibility = 'visible'
        // create new list item
        createNewListItem()
        // update total number of tasks
        totalTasks.innerText = listGroup.childElementCount
        // flush the input field
        newTask.value = ''
        message.textContent = ''
    } else {
        newTask.value = ''
        message.textContent = "Invalid Input!"
    }
})


function getNewID() {
    if (idNoList.length === 0) {
        idNo = 0
    } else {
        for (let i = 0; i < idNoList.length; i++) {
            if (idNo === idNoList[i]) {
                idNo = Math.max(...idNoList) + 1
            } else {
                idNo = idNo
            }
        }
    }
    idNoList.push(idNo)
    return idNo
}

function createNewListItem() {

    let newID = getNewID()

    let taskContent = newTask.value
    // new list item
    let new_task = document.createElement("li")
    new_task.setAttribute("class", "d-flex align-items-center justify-content-between list-group-item")
    new_task.setAttribute("id", `task-${newID}`)
    new_task.textContent = taskContent

    // check mark button
    let new_check_button = document.createElement("button")
    new_check_button.setAttribute("class", "btn py-0")
    new_check_button.setAttribute("id", `strikeBtn-${newID}`)
    new_check_button.setAttribute("onclick", "markDone(this.id)")
    let new_check = document.createElement("i")
    new_check.setAttribute("class", "fa-regular fa-circle-check px-2")
    new_check_button.appendChild(new_check)

    // trash mark button
    let new_trash_button = document.createElement("button")
    new_trash_button.setAttribute("class", "btn py-0")
    new_trash_button.setAttribute("id", `delBtn-${newID}`)
    new_trash_button.setAttribute("onclick", "deleteItem(this.id)")
    let new_trash = document.createElement("i")
    new_trash.setAttribute("class", "fa-solid fa-trash px-2")
    new_trash_button.append(new_trash)

    // buttons div
    let icon_div = document.createElement("div")
    icon_div.appendChild(new_check_button)
    icon_div.appendChild(new_trash_button)

    // append icon div to list element
    new_task.appendChild(icon_div)

    // add new list item to unordered list group
    listGroup.appendChild(new_task)
}

function markDone(id) {
    id = Number(id.split("-")[1])
    el = document.getElementById(`task-${id}`)

    if (el.style.textDecoration === "line-through") {
        el.style.color = "#212529"
        el.style.textDecoration = "none"
        // update number of tasks done
        markedDone--;
        tasksDone.innerText = markedDone
    } else {
        el.style.color = "rgb(170,170,170)"
        el.style.textDecoration = "line-through"
        // update number of tasks done
        markedDone++
        tasksDone.innerText = markedDone
    }
}

function deleteItem(id) {
    id = Number(id.split("-")[1])
    el = document.getElementById(`task-${id}`)
    // update total number of tasks marked done

    if (el.style.textDecoration === "line-through") {
        markedDone--;
    }
    el.remove()
    tasksDone.innerText = markedDone

    // update total number of tasks
    totalTasks.innerText = listGroup.childElementCount

    hideListIfEmpty()

    // remove its ID from idNoList
    idNoList = idNoList.filter(item => item != id)
}