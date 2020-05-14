import createElement from "./createElement";
export default function createPrompt(type) {
  const newPrompt = createElement({
    tag: "div",
    class: ["noTasks"],
    textContent:
      type === "renderPending"
        ? "No pending tasks!"
        : type === "renderCompleted"
        ? "No completed tasks!"
        : "No tasks!"
  });
  return newPrompt;
}
