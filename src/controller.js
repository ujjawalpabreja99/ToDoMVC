export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.connectModeltoView();
    this.connectViewtoModel();
    this.renderTasks(this.model.tasks);
  }
  connectModeltoView() {
    this.model.bindModelToViewRender(this.renderTasks);
  }
  connectViewtoModel() {
    // this.view.bindAddTask(this.addTaskHandler);
    // this.view.bindEditTask(this.editTaskHandler);
    // this.view.bindDeleteTask(this.deleteTaskHandler);
    // this.view.bindToggleTask(this.toggleTaskHandler);
    // this.view.bindGetTasks(this.getTasks);
    this.view.bindAddTask(taskText => this.model.addTask(taskText));
    this.view.bindEditTask((id, taskText) => this.model.editTask(id, taskText));
    this.view.bindDeleteTask(id => this.model.deleteTask(id));
    this.view.bindToggleTask(id => this.model.toggleTask(id));
    this.view.bindGetTasks(() => this.model.returnTasks());
  }
  renderTasks = tasks => {
    tasks.sort((taskA, taskB) => taskA.id - taskB.id);
    return this.view.renderTasks(tasks);
  };
  // addTaskHandler = taskText => this.model.addTask(taskText);
  // editTaskHandler = (id, taskText) => this.model.editTask(id, taskText);
  // deleteTaskHandler = id => this.model.deleteTask(id);
  // toggleTaskHandler = id => this.model.toggleTask(id);
  // getTasks = () => this.model.returnTasks();
}
