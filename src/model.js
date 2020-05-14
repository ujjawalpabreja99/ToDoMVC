const localStorage = sessionStorage;
const STATUS = "status";
const COMPLETE = "complete";
const INCOMPLETE = "incomplete";
export default class Model {
  constructor() {
    this.tasks = [];
    var keys = Object.keys(localStorage);
    var i = keys.length;
    while (i--) {
      if (keys[i].includes(STATUS)) {
        continue;
      }
      this.tasks = [
        ...this.tasks,
        {
          id: keys[i],
          text: localStorage.getItem(keys[i]),
          status: localStorage.getItem(STATUS + keys[i])
        }
      ];
    }
  }

  bindModelToViewRender(renderTasks) {
    this.renderTasks = renderTasks;
  }
  addTask(taskText) {
    // const isPresent = this.tasks.some(tasks => tasks.text === taskText);
    // if (!isPresent) {
    var task = {
      id: Date.now(),
      text: taskText,
      status: INCOMPLETE
    };
    this.tasks = [...this.tasks, task];
    localStorage.setItem(task.id, task.text);
    localStorage.setItem(STATUS + task.id, task.status);
    this.renderTasks(this.tasks);
    // } else {
    //   alert("Task already present in your to-do list!");
    // }
  }
  editTask(id, taskText) {
    // console.log("edittask");
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, text: taskText } : task
    );
    localStorage.setItem(id, taskText);
    this.renderTasks(this.tasks);
  }
  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    localStorage.removeItem(id);
    localStorage.removeItem(STATUS + id);
    this.renderTasks(this.tasks);
  }
  toggleTask(id) {
    const currentValue = localStorage.getItem(STATUS + id);
    this.tasks = this.tasks.map(task =>
      task.id === id
        ? { ...task, status: currentValue === COMPLETE ? INCOMPLETE : COMPLETE }
        : task
    );
    localStorage.setItem(
      STATUS + id,
      currentValue === COMPLETE ? INCOMPLETE : COMPLETE
    );
    this.renderTasks(this.tasks);
  }
  returnTasks() {
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
