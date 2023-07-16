const input = document.querySelector(".input");
const button = document.querySelector(".button");
const hint = document.querySelector(".question");
const modalWindow = document.querySelector(".modal-window");
const closeBtn = document.querySelector(".close");
const toDoContainer = document.querySelector(".container");
let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("tasks")) {
    let tasksLS = JSON.parse(localStorage.getItem("tasks"));

    for (let i = 0; i < tasksLS.length; i++) {
      createNewTask(tasksLS[i].description, tasksLS[i].date);
      console.log(tasksLS[i].description, tasksLS[i].date);
    }
  }
});

// Create Task
function createNewTask(description, date) {
  let newTask = document.createElement("p");
  newTask.classList.add("new-task");

  let inputValue = document.createElement("span");
  inputValue.classList.add("input-value");
  if (description == null) {
    inputValue.innerText = input.value;
  } else inputValue.innerText = description;

  let newDate = document.createElement("span");
  newDate.classList.add("date");
  if (date == null) {
    newDate.innerHTML = getTodaysDate();
  } else newDate.innerHTML = date;

  let myTask = {
    description: inputValue.innerText,
    date: newDate.innerHTML,
  };

  newTask.appendChild(inputValue);
  newTask.appendChild(newDate);

  tasks.push(myTask);
  console.log(tasks);
  input.value = "";

  toDoContainer.appendChild(newTask);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  newTask.addEventListener("click", () => {
    newTask.classList.toggle("finished-task");
  });

  // Delete Task
  newTask.addEventListener("dblclick", () => {
    toDoContainer.removeChild(newTask);
    console.log(newDate.innerHTML);

    let tasksLocalStorage = JSON.parse(localStorage["tasks"]);
    console.log(tasksLocalStorage);

    for (let i = 0; i < tasksLocalStorage.length; i++) {
      if (tasksLocalStorage[i].date === newDate.innerHTML)
        tasksLocalStorage.splice(i, 1);
    }
    localStorage.setItem("tasks", JSON.stringify(tasksLocalStorage));
  });
}

button.addEventListener("click", createNewTask);

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    createNewTask();
  }
});

// Modal Window
hint.addEventListener("click", () => {
  modalWindow.style.display = "inherit";
});

closeBtn.addEventListener("click", () => {
  modalWindow.style.display = "none";
});

// Get Date
function getTodaysDate() {
  let now = new Date();

  // date
  let dateNumber = now.getDate();
  dateNumber < 10
    ? (dateNumber = String(now.getDate()).padStart(2, "0"))
    : now.getDate();

  // months
  let month = now.getMonth() + 1;
  month < 10
    ? (month = String(now.getMonth() + 1).padStart(2, "0"))
    : (month = now.getMonth() + 1);
  // console.log(month);

  // years
  let year = now.getFullYear();

  // hours
  let hours = now.getHours();
  hours < 10
    ? (hours = String(now.getHours()).padStart(2, "0"))
    : (hours = now.getHours());
  // console.log(hours);

  // minutes
  let minutes = now.getMinutes();
  minutes < 10
    ? (minutes = String(now.getMinutes()).padStart(2, "0"))
    : (minutes = now.getMinutes());
  // console.log(minutes);

  //seconds
  let seconds = now.getSeconds();
  seconds < 10
    ? (seconds = String(now.getSeconds()).padStart(2, "0"))
    : (seconds = now.getSeconds());
  // console.log(seconds);

  let todaysDate = `${dateNumber}.${month}.${year},  ${hours}:${minutes}:${seconds}`;

  return todaysDate;
}
