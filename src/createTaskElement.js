import createElement from "./createElement";
import { CHECKBOX, COMPLETE, SPAN } from "./constants";

export default function createTaskElement(task) {
  const li = createElement({ tag: "li", id: task.id });
  const checkbox = createElement({
    tag: "input",
    id: CHECKBOX + task.id,
    type: "checkbox",
    checked: task.status === COMPLETE ? true : false
  });
  const span = createElement({
    tag: "span",
    id: SPAN + task.id,
    contentEditable: true
  });
  if (task.status === COMPLETE) {
    const strikethrough = createElement({
      tag: "s",
      textContent: task.description
    });
    span.append(strikethrough);
  } else {
    span.textContent = task.description;
  }
  const deleteButton = createElement({
    tag: "button",
    id: "deleteTask",
    class: ["delete"],
    textContent: "Delete"
  });
  li.append(checkbox, span, deleteButton);
  return li;
}
