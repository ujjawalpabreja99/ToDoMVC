import { COMPLETE, INCOMPLETE, TASKS } from "./constants";

export default class Model {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem(TASKS)) || [];
  }
  updateLocalStorage(tasks) {
    localStorage.setItem(TASKS, JSON.stringify(tasks));
  }

  bindRenderTasks(renderTasks) {
    this.renderTasks = renderTasks;
  }

  addTask(taskDescription) {
    const task = {
      id: Date.now(),
      description: taskDescription,
      status: INCOMPLETE
    };
    this.tasks = [...this.tasks, task];
    this.updateLocalStorage(this.tasks);
    this.renderTasks(this.tasks);
  }

  editTask(id, editedDescription) {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, description: editedDescription } : task
    );
    this.updateLocalStorage(this.tasks);
    this.renderTasks(this.tasks);
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.updateLocalStorage(this.tasks);
    this.renderTasks(this.tasks);
  }

  toggleTask(id) {
    this.tasks = this.tasks.map(task =>
      task.id === id
        ? {
            ...task,
            status: task.status === COMPLETE ? INCOMPLETE : COMPLETE
          }
        : task
    );
    this.updateLocalStorage(this.tasks);
    this.renderTasks(this.tasks);
  }

  getTasks() {
    return this.tasks;
  }
}
