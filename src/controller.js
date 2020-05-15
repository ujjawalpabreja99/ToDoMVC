export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.connectModeltoView();
    this.connectViewtoModel();
    this.initRender();
  }
  connectModeltoView() {
    this.model.bindRenderTasks(tasks => this.view.renderTasks(tasks));
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

  initRender = () => this.view.renderTasks(this.model.tasks);
}
