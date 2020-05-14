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
    this.attachEventListeners();
    this.renderTaskList = "renderAll";
    this.editedDescription = "";
    this.editingDescription();
  }

  setupHTMLElements() {
    this.form = this.getElement("taskForm");
    this.input = this.getElement("taskInput");
    this.taskList = this.getElement("taskList");
    this.renderAllButton = this.getElement("renderAll");
    this.renderPendingButton = this.getElement("renderPending");
    this.renderCompletedButton = this.getElement("renderCompleted");
  }
  getElement(id) {
    return document.getElementById(id);
  }

  attachEventListeners() {
    this.renderAllButton.addEventListener("click", this.renderList);
    this.renderPendingButton.addEventListener("click", this.renderList);
    this.renderCompletedButton.addEventListener("click", this.renderList);
  }
  renderList = e => {
    this.renderTaskList = e.target.id;
    this.renderTasks(this.getTasks());
  };

  editingDescription() {
    this.taskList.addEventListener("input", e => {
      if (e.target.id === SPAN + e.target.parentElement.id) {
        this.editedDescription = e.target.innerText;
      }
    });
  }

  renderTasks(tasks) {
    while (this.taskList.firstChild) {
      this.taskList.removeChild(this.taskList.firstChild);
    }
    tasks.forEach(task => {
      if (
        this.renderTaskList === RENDERALL ||
        (this.renderTaskList === RENDERPENDING && task.status === INCOMPLETE) ||
        (this.renderTaskList === RENDERCOMPLETED && task.status === COMPLETE)
      ) {
        const newTaskElement = createTaskElement(task);
        this.taskList.append(newTaskElement);
      }
    });
    if (!this.taskList.firstChild) {
      const newPrompt = createPrompt(this.renderTaskList);
      this.taskList.append(newPrompt);
    }
  }

  bindAddTask(addTaskHandler) {
    this.form.addEventListener("submit", e => {
      e.preventDefault();
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
      if (this.editedDescription) {
        const id = parseInt(e.target.parentElement.id, 10);
        editTaskHandler(id, this.editedDescription);
        this.editedDescription = "";
      }
    });
  }

  bindDeleteTask(deleteTaskHandler) {
    this.taskList.addEventListener("click", e => {
      if (e.target.id === "deleteTask") {
        const id = parseInt(e.target.parentElement.id, 10);
        deleteTaskHandler(id);
      }
    });
  }

  bindToggleTask(toggleTaskHandler) {
    this.taskList.addEventListener("change", e => {
      if (e.target.type === "checkbox") {
        const id = parseInt(e.target.parentElement.id, 10);
        toggleTaskHandler(id);
      }
    });
  }

  bindGetTasks(getTasks) {
    this.getTasks = getTasks;
  }
}
