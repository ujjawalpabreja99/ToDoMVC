import * as constants from "./constants";

export default class Model {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem(constants.TASKS)) || [];
  }

  bindRenderTasks(renderTasks) {
    this.renderTasks = renderTasks;
  }

  updateLocalStorage(tasks) {
    localStorage.setItem(constants.TASKS, JSON.stringify(tasks));
    this.renderTasks(tasks);
  }

  addTask(taskDescription) {
    const task = {
      id: Date.now(),
      description: taskDescription,
      status: constants.INCOMPLETE
    };
    this.tasks = [...this.tasks, task];
    this.updateLocalStorage(this.tasks);
  }

  editTask(id, editedDescription) {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, description: editedDescription } : task
    );
    this.updateLocalStorage(this.tasks);
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.updateLocalStorage(this.tasks);
  }

  toggleTask(id) {
    this.tasks = this.tasks.map(task =>
      task.id === id
        ? {
            ...task,
            status:
              task.status === constants.COMPLETE
                ? constants.INCOMPLETE
                : constants.COMPLETE
          }
        : task
    );
    this.updateLocalStorage(this.tasks);
  }

  getTasks() {
    return this.tasks;
  }
}
