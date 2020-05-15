export default function createElement(element) {
  const newElement = document.createElement(element.tag);
  if (element.id) {
    newElement.id = element.id;
  }
  if (element.class) {
    element.class.forEach(newClass => {
      newElement.classList.add(newClass);
    });
  }
  if (element.type) {
    newElement.type = element.type;
  }
  if (element.placeholder) {
    newElement.placeholder = element.placeholder;
  }
  if (element.textContent) {
    newElement.textContent = element.textContent;
  }
  if (element.checked) {
    newElement.checked = element.checked;
  }
  if (element.contentEditable) {
    newElement.contentEditable = element.contentEditable;
  }
  return newElement;
}
