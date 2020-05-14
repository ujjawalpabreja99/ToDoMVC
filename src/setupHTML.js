import createElement from "./createElement";

export default function setupHTMLL() {
  const app = document.querySelector("#to-do-mvc");
  const form = createElement({ tag: "form" });
  const input = createElement({
    tag: "input",
    type: "text",
    placeholder: "What task is on your mind ? "
  });
  const submitButton = createElement({ tag: "button", textContent: "Submit" });
  const title = createElement({ tag: "h1", textContent: "To-Do MVC" });
  const taskList = createElement({ tag: "ul" });
  const renderAllButton = createElement({
    tag: "button",
    id: "allTasks",
    textContent: "All tasks"
  });
  const renderPendingButton = createElement({
    tag: "button",
    id: "pendingTasks",
    textContent: "Pending tasks"
  });
  const renderCompletedButton = createElement({
    tag: "button",
    id: "completedTasks",
    textContent: "Completed tasks"
  });
  const buttonContainer = createElement({ tag: "div", class: ["buttonDiv"] });
  form.append(input, submitButton);
  buttonContainer.append(
    renderAllButton,
    renderPendingButton,
    renderCompletedButton
  );
  app.append(title, form, taskList, buttonContainer);
  return app;
}
