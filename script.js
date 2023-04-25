const input = document.querySelector(".input");
const button = document.querySelector(".button");

const toDoContainer = document.querySelector(".container");

function createNewTask() {
  let newTask = document.createElement("li");
  newTask.classList.add("new-task");

  newTask.innerText = input.value;
  toDoContainer.appendChild(newTask);
  input.value = "";

  newTask.addEventListener("click", () => {
    newTask.classList.toggle("finished-task");
  });

  newTask.addEventListener("dblclick", () => {
    toDoContainer.removeChild(newTask);
  });
}

button.addEventListener("click", createNewTask);

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    createNewTask();
  }
});
