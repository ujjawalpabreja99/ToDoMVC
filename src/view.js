import createTaskElement from "./createTaskElement";
import createPrompt from "./createPrompt";
import * as constants from "./constants";

export default class View {
  constructor() {
    this.setupHTMLElements();
    this.setupEventListeners();
    this.currentRender = constants.RENDERALL;
    this.editedDescription = "";
  }

  setupHTMLElements() {
    this.taskForm = this.getElement(constants.TASKFORM);
    this.taskInput = this.getElement(constants.TASKINPUT);
    this.tasksUL = this.getElement(constants.TASKSUL);
    this.renderPendingCount = this.getElement(constants.PENDINGCOUNT);
    this.renderAllButton = this.getElement(constants.RENDERALL);
    this.renderPendingButton = this.getElement(constants.RENDERPENDING);
    this.renderCompletedButton = this.getElement(constants.RENDERCOMPLETED);
  }
  getElement(id) {
    return document.getElementById(id);
  }

  setupEventListeners() {
    this.tasksUL.addEventListener(constants.INPUT, this.editingTask);
    this.renderAllButton.addEventListener(constants.CLICK, this.switchList);
    this.renderPendingButton.addEventListener(constants.CLICK, this.switchList);
    this.renderCompletedButton.addEventListener(
      constants.CLICK,
      this.switchList
    );
  }
  switchList = e => {
    this.currentRender = e.target.id;
    this.renderTasks(this.getTasks());
  };
  editingTask = e => {
    if (e.target.id === constants.SPAN + e.target.parentElement.id) {
      this.editedDescription = e.target.innerText;
    }
  };

  setPendingCount(pendingCount) {
    if (pendingCount === 1) {
      this.renderPendingCount.textContent =
        pendingCount.toString() + " task left";
    } else {
      this.renderPendingCount.textContent =
        pendingCount.toString() + " tasks left";
    }
  }

  renderTasks(tasks) {
    while (this.tasksUL.firstChild) {
      this.tasksUL.removeChild(this.tasksUL.firstChild);
    }
    var pendingCount = 0;
    tasks.forEach(task => {
      if (
        this.currentRender === constants.RENDERALL ||
        (this.currentRender === constants.RENDERPENDING &&
          task.status === constants.INCOMPLETE) ||
        (this.currentRender === constants.RENDERCOMPLETED &&
          task.status === constants.COMPLETE)
      ) {
        const taskLI = createTaskElement(task);
        this.tasksUL.append(taskLI);
        pendingCount += task.status === constants.INCOMPLETE;
      }
    });
    this.setPendingCount(pendingCount);
    if (!this.tasksUL.firstChild) {
      const promptLI = createPrompt(this.currentRender);
      this.tasksUL.append(promptLI);
    }
  }

  bindAddTask(addTaskHandler) {
    this.taskForm.addEventListener(constants.SUBMIT, e => {
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
    this.tasksUL.addEventListener(constants.FOCUSOUT, e => {
      if (this.editedDescription) {
        const id = parseInt(e.target.parentElement.id, 10);
        editTaskHandler(id, this.editedDescription);
        this.editedDescription = "";
      }
    });
  }

  bindDeleteTask(deleteTaskHandler) {
    this.tasksUL.addEventListener(constants.CLICK, e => {
      if (e.target.id === constants.DELETETASK) {
        const id = parseInt(e.target.parentElement.id, 10);
        deleteTaskHandler(id);
      }
    });
  }

  bindToggleTask(toggleTaskHandler) {
    this.tasksUL.addEventListener(constants.CHANGE, e => {
      if (e.target.type === constants.CHECKBOX) {
        const id = parseInt(e.target.parentElement.id, 10);
        toggleTaskHandler(id);
      }
    });
  }

  bindGetTasks(getTasks) {
    this.getTasks = getTasks;
  }
}
