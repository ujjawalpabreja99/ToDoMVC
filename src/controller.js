export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.connectModeltoView();
    this.connectViewtoModel();
    this.renderTasks(this.model.tasks);
  }
  connectModeltoView() {
    this.model.bindRenderTasks(this.renderTasks);
  }
  connectViewtoModel() {
    this.view.bindAddTask(taskDescription =>
      this.model.addTask(taskDescription)
    );
    this.view.bindEditTask((id, editedDescription) =>
      this.model.editTask(id, editedDescription)
    );
    this.view.bindDeleteTask(id => this.model.deleteTask(id));
    this.view.bindToggleTask(id => this.model.toggleTask(id));
    this.view.bindGetTasks(() => this.model.getTasks());
  }
  renderTasks = tasks => {
    // tasks.sort((taskA, taskB) => taskA.id - taskB.id);
    return this.view.renderTasks(tasks);
  };
}
