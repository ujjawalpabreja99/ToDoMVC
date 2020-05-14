// import createElement from "./createElement";
import createTaskElement from "./createTaskElement";
import createPrompt from "./createPrompt";
const COMPLETE = "complete";
const INCOMPLETE = "incomplete";
const SPAN = "span";
export default class View {
  constructor() {
    this.setupHTML();
    this.editedTaskText = "";
    this.editingTask();
    this.renderListType = "renderAll";
    this.renderList();
  }
  setupHTML() {
    this.app = document.querySelector("#ToDoMVC");
    this.form = document.querySelector("#taskForm");
    this.input = document.querySelector("#taskInput");
    this.taskList = document.querySelector("#taskList");
  }
  renderTasks(tasks) {
    while (this.taskList.firstChild) {
      this.taskList.removeChild(this.taskList.firstChild);
    }
    tasks.forEach(task => {
      if (
        (task.status === COMPLETE &&
          this.renderListType === "renderCompleted") ||
        (task.status === INCOMPLETE &&
          this.renderListType === "renderPending") ||
        this.renderListType === "renderAll"
      ) {
        const newTaskElement = createTaskElement(task);
        this.taskList.append(newTaskElement);
      }
    });
    if (!this.taskList.firstChild) {
      const newPrompt = createPrompt(this.renderListType);
      this.taskList.append(newPrompt);
    }
  }
  editingTask() {
    this.taskList.addEventListener("input", e => {
      if (e.target.id === SPAN + e.target.parentElement.id) {
        this.editedTaskText = e.target.innerText;
      }
    });
  }
  renderList() {
    this.app.addEventListener("click", e => {
      if (
        e.target.id === "renderAll" ||
        e.target.id === "renderPending" ||
        e.target.id === "renderCompleted"
      ) {
        this.renderListType = e.target.id;
        this.renderTasks(this.getTasks());
      }
    });
  }
  bindAddTask(addTaskHandler) {
    this.form.addEventListener("submit", e => {
      // e.preventDefault();
      if (this.input.value) {
        addTaskHandler(this.input.value);
        this.input.value = "";
      } else {
        alert("Can't add an empty task");
      }
    });
  }
  bindEditTask(editTaskHandler) {
    this.taskList.addEventListener("focusout", e => {
      if (this.editedTaskText) {
        editTaskHandler(e.target.parentElement.id, this.editedTaskText);
        this.editedTaskText = "";
      }
    });
  }
  bindDeleteTask(deleteTaskHandler) {
    this.taskList.addEventListener("click", e => {
      console.log(e.target);
      if (e.target.id === "deleteTask") {
        console.log(e.target.parentElement.id);
        deleteTaskHandler(e.target.parentElement.id);
      }
    });
  }
  bindToggleTask(toggleTaskHandler) {
    this.taskList.addEventListener("change", e => {
      if (e.target.type === "checkbox") {
        toggleTaskHandler(e.target.parentElement.id);
      }
    });
  }
  bindGetTasks(returnTasks) {
    this.getTasks = returnTasks;
  }
}
