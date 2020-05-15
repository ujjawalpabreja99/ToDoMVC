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
    this.setupEventListeners();
    this.currentRender = RENDERALL;
    this.editedDescription = "";
  }

  setupHTMLElements() {
    this.taskForm = this.getElement("taskForm");
    this.taskInput = this.getElement("taskInput");
    this.tasksUL = this.getElement("tasksUL");
    this.renderAllButton = this.getElement(RENDERALL);
    this.renderPendingButton = this.getElement(RENDERPENDING);
    this.renderCompletedButton = this.getElement(RENDERCOMPLETED);
  }
  getElement(id) {
    return document.getElementById(id);
  }

  setupEventListeners() {
    this.tasksUL.addEventListener("input", this.editingTask);
    this.renderAllButton.addEventListener("click", this.switchList);
    this.renderPendingButton.addEventListener("click", this.switchList);
    this.renderCompletedButton.addEventListener("click", this.switchList);
  }
  switchList = e => {
    this.currentRender = e.target.id;
    this.renderTasks(this.getTasks());
  };
  editingTask = e => {
    if (e.target.id === SPAN + e.target.parentElement.id) {
      this.editedDescription = e.target.innerText;
    }
  };

  renderTasks(tasks) {
    while (this.tasksUL.firstChild) {
      this.tasksUL.removeChild(this.tasksUL.firstChild);
    }
    tasks.forEach(task => {
      if (
        this.currentRender === RENDERALL ||
        (this.currentRender === RENDERPENDING && task.status === INCOMPLETE) ||
        (this.currentRender === RENDERCOMPLETED && task.status === COMPLETE)
      ) {
        const taskLI = createTaskElement(task);
        this.tasksUL.append(taskLI);
      }
    });
    if (!this.tasksUL.firstChild) {
      const promptLI = createPrompt(this.currentRender);
      this.tasksUL.append(promptLI);
    }
  }

  bindAddTask(addTaskHandler) {
    this.taskForm.addEventListener("submit", e => {
      e.preventDefault();
      if (this.taskInput.value) {
        addTaskHandler(this.taskInput.value);
        this.taskInput.value = "";
      } else {
        alert("Can't add an empty task");
      }
    });
  }

  bindEditTask(editTaskHandler) {
    this.tasksUL.addEventListener("focusout", e => {
      if (this.editedDescription) {
        const id = parseInt(e.target.parentElement.id, 10);
        editTaskHandler(id, this.editedDescription);
        this.editedDescription = "";
      }
    });
  }

  bindDeleteTask(deleteTaskHandler) {
    this.tasksUL.addEventListener("click", e => {
      if (e.target.id === "deleteTask") {
        const id = parseInt(e.target.parentElement.id, 10);
        deleteTaskHandler(id);
      }
    });
  }

  bindToggleTask(toggleTaskHandler) {
    this.tasksUL.addEventListener("change", e => {
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
