export default function createElement(newElement) {
  const element = document.createElement(newElement.tag);
  if (newElement.id) {
    element.id = newElement.id;
  }
  if (newElement.class) {
    newElement.class.forEach(newClass => {
      element.classList.add(newClass);
    });
  }
  if (newElement.type) {
    element.type = newElement.type;
  }
  if (newElement.placeholder) {
    element.placeholder = newElement.placeholder;
  }
  if (newElement.textContent) {
    element.textContent = newElement.textContent;
  }
  if (newElement.checked) {
    element.checked = newElement.checked;
  }
  if (newElement.contentEditable) {
    element.contentEditable = newElement.contentEditable;
  }
  return element;
}
