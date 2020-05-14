import { COMPLETE, INCOMPLETE } from "./constants";

export default class Model {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log(this.tasks);
  }
  updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
  addTask(taskDescription) {
    const task = {
      id: Date.now(),
      description: taskDescription,
      status: INCOMPLETE
    };
    this.tasks = [...this.tasks, task];
    this.updateLocalStorage();
    this.renderTasks(this.tasks);
  }

  editTask(id, editedDescription) {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, description: editedDescription } : task
    );
    this.updateLocalStorage();
    this.renderTasks(this.tasks);
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.updateLocalStorage();
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
    this.updateLocalStorage();
    this.renderTasks(this.tasks);
  }

  bindRenderTasks(renderTasks) {
    this.renderTasks = renderTasks;
  }
  getTasks() {
    return this.tasks;
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
