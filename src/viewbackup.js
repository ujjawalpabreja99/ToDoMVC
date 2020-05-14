import createElement from "./createElement";
import createTaskElement from "./createTaskElement";
export default class View {
  constructor() {
    this.setupHTML();
    // edited task
    this.editedTaskText = "";
    this.editingTask();
    // viewing window
    this.type = "allTasks";
    this.changeView();
  }
  setupHTML() {
    this.app = document.querySelector("#to-do-mvc");
    this.form = createElement({ tag: "form" });
    this.input = createElement({
      tag: "input",
      type: "text",
      placeholder: "What task is on your mind ? "
    });
    this.submitButton = createElement({ tag: "button", textContent: "Submit" });
    this.title = createElement({ tag: "h1", textContent: "To-Do MVC" });
    this.taskList = createElement({ tag: "ul" });
    this.renderAllButton = createElement({
      tag: "button",
      id: "allTasks",
      textContent: "All tasks"
    });
    this.renderPendingButton = createElement({
      tag: "button",
      id: "pendingTasks",
      textContent: "Pending tasks"
    });
    this.renderCompletedButton = createElement({
      tag: "button",
      id: "completedTasks",
      textContent: "Completed tasks"
    });
    this.buttonContainer = createElement({ tag: "div", class: ["buttonDiv"] });
    // this.form = document.createElement("form");
    // this.input = document.createElement("input");
    // this.input.type = "text";
    // this.input.placeholder = "What task is on your mind ? ";
    // this.submitButton = this.createButton("", "Submit");
    // this.title = document.createElement("h1");
    // this.title.textContent = "To-Do MVC";
    // list of tasks
    // this.taskList = document.createElement("ul");
    // buttons
    // this.viewAllButton = this.createButton("allTasks", "All tasks");
    // this.viewPendingButton = this.createButton("pendingTasks", "Pending tasks");
    // this.viewCompletedButton = this.createButton(
    //   "completedTasks",
    //   "Completed tasks"
    // );
    // this.div = document.createElement("div");
    // this.div.classList.add("buttonDiv");
    this.form.append(this.input, this.submitButton);
    this.buttonContainer.append(
      this.renderAllButton,
      this.renderPendingButton,
      this.renderCompletedButton
    );
    this.app.append(this.title, this.form, this.taskList, this.buttonContainer);
    console.log(this.app);
  }
  createButton(className, text) {
    const newButton = document.createElement("button");
    if (className) {
      newButton.classList.add(className);
    }
    if (text) {
      newButton.textContent = text;
    }
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
      // const li = document.createElement("li");
      // li.id = task.id;

      // const checkbox = document.createElement("input");
      // checkbox.type = "checkbox";
      // checkbox.checked = task.isComplete === "true" ? true : false;
      // checkbox.id = "checkbox" + task.id;

      // const span = document.createElement("span");
      // span.contentEditable = true;
      // span.id = "span" + task.id;

      // if (task.isComplete === "true") {
      //   const strikethrough = document.createElement("s");
      //   strikethrough.textContent = task.text;
      //   span.append(strikethrough);
      // } else {
      //   span.textContent = task.text;
      // }

      // const deleteButton = this.createButton("delete", "Delete");

      // li.append(checkbox, span, deleteButton);
      if (
        (task.isComplete === "true" && this.type === "completedTasks") ||
        (task.isComplete === "false" && this.type === "pendingTasks") ||
        this.type === "allTasks"
      ) {
        // const newTask = this.createTaskElement(task);
        const newTaskElement = createTaskElement(task);
        this.taskList.append(newTaskElement);
      }
    });
    if (!this.taskList.firstChild) {
      // const li = document.createElement("div");
      // li.classList.add("noTasks");
      // li.textContent =
      //   this.type === "pendingTasks"
      //     ? "No pending tasks!"
      //     : this.type === "completedTasks"
      //     ? "No completed tasks!"
      //     : "No tasks!";
      const newPrompt = createElement({
        tag: "div",
        class: ["noTasks"],
        textContent:
          this.type === "pendingTasks"
            ? "No pending tasks!"
            : this.type === "completedTasks"
            ? "No completed tasks!"
            : "No tasks!"
      });
      this.taskList.append(newPrompt);
    }
  }
  editingTask() {
    this.taskList.addEventListener("input", e => {
      if (e.target.id === "span" + e.target.parentElement.id) {
        this.editedTaskText = e.target.innerText;
      }
    });
  }
  changeView() {
    this.app.addEventListener("click", e => {
      if (
        e.target.id === "allTasks" ||
        e.target.id === "pendingTasks" ||
        e.target.id === "completedTasks"
      ) {
        this.type = e.target.id;
        this.display(this.currentTasks());
      }
    });
  }
  bindViewToModelAddTask(addTaskHandler) {
    this.form.addEventListener("submit", e => {
      if (this.input.value) {
        // console.log(this.input.value);
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
        toggleTaskHandler(e.target.parentElement.id);
      }
    });
  }
  bindViewToModelTasks(currentTasks) {
    this.currentTasks = currentTasks;
  }
}
