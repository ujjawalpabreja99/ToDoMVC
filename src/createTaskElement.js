import createElement from "./createElement";
const CHECKBOX = "checkbox";
const SPAN = "span";
const COMPLETE = "complete";
export default function createTaskElement(task) {
  // const li = document.createElement("li");
  // li.id = task.id;
  // const checkbox = document.createElement("input");
  // checkbox.type = "checkbox";
  // checkbox.checked = task.isComplete === "true" ? true : false;
  // checkbox.id = "checkbox" + task.id;
  // const span = document.createElement("span");
  // span.id = "span" + task.id;
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
  // span.contentEditable = true;
  if (task.status === COMPLETE) {
    const strikethrough = createElement({ tag: "s", textContent: task.text });
    span.append(strikethrough);
  } else {
    span.textContent = task.text;
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
