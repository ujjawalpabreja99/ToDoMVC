// const localStorage = sessionStorage;
class Model {
  constructor() {
    this.tasks = [];
    var keys = Object.keys(localStorage);
    var i = keys.length;
    while (i--) {
      if (keys[i].includes("isComplete")) {
        continue;
      }
      this.tasks.push({
        id: keys[i],
        text: localStorage.getItem(keys[i]),
        isComplete: localStorage.getItem("isComplete" + keys[i])
      });
    }
  }
  currentTasks() {
    return this.tasks;
  }
  addTask(taskText) {
    var isPresent = this.tasks.some(tasks => tasks.text === taskText);
    if (!isPresent) {
      var task = {
        id: Date.now(),
        text: taskText,
        isComplete: false
      };
      this.tasks = [task, ...this.tasks];
      localStorage.setItem(task.id, task.text);
      localStorage.setItem("isComplete" + task.id, task.isComplete);
      this.displayTasks(this.tasks);
    } else {
      alert("Task already present in your to-do list!");
    }
  }
  editTask(id, taskText) {
    this.tasks = this.tasks.map(task =>
      task.id === id
        ? { id: task.id, text: taskText, isComplete: task.isComplete }
        : task
    );
    localStorage.setItem(id, taskText);
    this.displayTasks(this.tasks);
  }
  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    localStorage.removeItem(id);
    localStorage.removeItem("isComplete" + id);
    this.displayTasks(this.tasks);
  }
  toggleTask(id) {
    this.tasks = this.tasks.map(task =>
      task.id === id
        ? {
            id: task.id,
            text: task.text,
            isComplete: task.isComplete === "true" ? "false" : "true"
          }
        : task
    );
    localStorage.setItem(
      "isComplete" + id,
      localStorage.getItem("isComplete" + id) === "true" ? "false" : "true"
    );
    this.displayTasks(this.tasks);
  }
  bindModelToViewDisplay(displayTasks) {
    this.displayTasks = displayTasks;
  }
  // print() {
  //   console.log("TASKS = ");
  //   console.log(this.tasks);
  //   console.log("LOCALSTORAGE");
  //   var keys = Object.keys(localStorage);
  //   var i = keys.length;
  //   while (i--) {
  //     console.log(localStorage.getItem(keys[i]));
  //   }
  // }
}

class View {
  constructor() {
    this.app = document.querySelector("#root");
    // input
    this.form = document.createElement("form");
    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.placeholder = "What task is on your mind ? ";
    this.input.name = "task";
    this.submitButton = document.createElement("button");
    this.submitButton.textContent = "Submit";
    this.form.append(this.input, this.submitButton);
    // title
    this.title = document.createElement("h1");
    this.title.textContent = "todo app";
    // list of tasks
    this.taskList = document.createElement("ul");
    // buttons
    this.viewAllButton = this.createButton("allTasks", "All tasks");
    this.viewPendingButton = this.createButton("pendingTasks", "Pending tasks");
    this.viewCompletedButton = this.createButton(
      "completedTasks",
      "Completed tasks"
    );
    // button div
    this.div = document.createElement("div");
    this.div.classList.add("buttonDiv");
    this.div.append(
      this.viewAllButton,
      this.viewPendingButton,
      this.viewCompletedButton
    );
    this.app.append(this.title, this.form, this.taskList, this.div);
    // edited task
    this.editedTaskText = "";
    this.editingTask();
    // viewing window
    this.type = "allTasks";
    this.changeView();
  }
  createButton(className, text) {
    const newButton = document.createElement("button");
    newButton.classList.add(className);
    newButton.textContent = text;
    return newButton;
  }
  display(tasks) {
    while (this.taskList.firstChild) {
      this.taskList.removeChild(this.taskList.firstChild);
    }
    // console.log(this.type);
    console.log(tasks);
    console.log(localStorage);
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.id = task.id;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.isComplete === "true" ? true : false;
      checkbox.id = "checkbox" + task.id;

      const span = document.createElement("span");
      span.contentEditable = true;
      span.id = "span" + task.id;

      if (task.isComplete === "true") {
        const strikethrough = document.createElement("s");
        strikethrough.textContent = task.text;
        span.append(strikethrough);
      } else {
        span.textContent = task.text;
      }

      const deleteButton = this.createButton("delete", "Delete");

      li.append(checkbox, span, deleteButton);
      if (
        (task.isComplete === "true" && this.type === "completedTasks") ||
        (task.isComplete === "false" && this.type === "pendingTasks") ||
        this.type === "allTasks"
      ) {
        this.taskList.append(li);
      }
    });
    if (!this.taskList.firstChild) {
      const li = document.createElement("div");
      li.classList.add("noTasks");
      li.textContent =
        this.type === "pendingTasks"
          ? "No pending tasks!"
          : this.type === "completedTasks"
          ? "No completed tasks!"
          : "No tasks!";
      this.taskList.append(li);
    }
  }
  // task editing listener
  editingTask() {
    this.taskList.addEventListener("input", e => {
      if (e.target.id === "span" + e.target.parentElement.id) {
        this.editedTaskText = e.target.innerText;
      }
    });
  }
  // changing view listener
  changeView() {
    this.app.addEventListener("click", e => {
      if (
        e.target.className === "allTasks" ||
        e.target.className === "pendingTasks" ||
        e.target.className === "completedTasks"
      ) {
        this.type = e.target.className;
        // const tasks = this.currentTasks;
        this.display(this.currentTasks());
      }
    });
  }
  // binding handlers
  bindViewToModelAddTask(addTaskHandler) {
    this.form.addEventListener("submit", e => {
      if (this.input.value) {
        console.log(this.input.value);
        addTaskHandler(this.input.value);
        this.input.value = "";
      } else {
        alert("Can't add an empty task");
      }
    });
  }
  bindViewToModelDeleteTask(deleteTaskHandler) {
    this.taskList.addEventListener("click", e => {
      if (e.target.className === "delete") {
        // console.log(e.target.parentElement.id);
        deleteTaskHandler(e.target.parentElement.id);
      }
    });
  }
  bindViewToModelEditTask(editTaskHandler) {
    this.taskList.addEventListener("focusout", e => {
      if (this.editedTaskText) {
        editTaskHandler(e.target.parentElement.id, this.editedTaskText);
        this.editedTaskText = "";
      }
    });
  }
  bindViewToModelToggleTask(toggleTaskHandler) {
    this.taskList.addEventListener("change", e => {
      if (e.target.type === "checkbox") {
        const id = e.target.parentElement.id;
        toggleTaskHandler(id);
      }
    });
  }
  bindViewToModelTasks(currentTasks) {
    this.currentTasks = currentTasks;
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindModelToViewDisplay(this.displayTasks);
    this.view.bindViewToModelAddTask(this.addTaskHandler);
    this.view.bindViewToModelDeleteTask(this.deleteTaskHandler);
    this.view.bindViewToModelEditTask(this.editTaskHandler);
    this.view.bindViewToModelToggleTask(this.toggleTaskHandler);
    this.view.bindViewToModelTasks(this.currentTasks);
    this.displayTasks(this.model.tasks);
  }
  displayTasks = tasks => this.view.display(tasks);
  addTaskHandler = taskText => this.model.addTask(taskText);
  deleteTaskHandler = id => this.model.deleteTask(id);
  editTaskHandler = (id, taskText) => this.model.editTask(id, taskText);
  toggleTaskHandler = id => this.model.toggleTask(id);
  currentTasks = () => this.model.currentTasks();
}
const newModel = new Model();
const newView = new View();
const toDoApp = new Controller(newModel, newView);
