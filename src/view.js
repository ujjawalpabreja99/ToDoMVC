// import createElement from "./createElement";
import createTaskElement from "./createTaskElement";
import createPrompt from "./createPrompt";
import {
  COMPLETE,
  INCOMPLETE,
  SPAN,
  RENDERALL,
  RENDERPENDING,
  RENDERCOMPLETED
} from "./constants";

export default class View {
  constructor() {
    this.setupHTMLElements();
    this.editedTaskText = "";
    this.editingTask();
    this.renderListType = "renderAll";
    this.renderList();
  }
  setupHTMLElements() {
    this.app = this.getElement("ToDoMVC");
    this.form = this.getElement("taskForm");
    this.input = this.getElement("taskInput");
    this.taskList = this.getElement("taskList");
  }
  getElement(id) {
    return document.getElementById(id);
  }
  renderTasks(tasks) {
    while (this.taskList.firstChild) {
      this.taskList.removeChild(this.taskList.firstChild);
    }
    const renderAll = this.renderListType === RENDERALL;
    const renderPending = this.renderListType === RENDERPENDING;
    const renderCompleted = this.renderListType === RENDERCOMPLETED;
    tasks.forEach(task => {
      if (
        renderAll ||
        (renderCompleted && task.status === COMPLETE) ||
        (renderPending && task.status === INCOMPLETE)
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
        e.target.id === RENDERALL ||
        e.target.id === RENDERPENDING ||
        e.target.id === RENDERCOMPLETED
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
  bindGetTasks(getTasks) {
    this.getTasks = getTasks;
  }
}
