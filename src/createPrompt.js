import createElement from "./createElement";
import { RENDERPENDING, RENDERCOMPLETED } from "./constants";

export default function createPrompt(currentRender) {
  const newPrompt = createElement({
    tag: "div",
    class: ["noTasks"],
    textContent:
      currentRender === RENDERPENDING
        ? "No pending tasks!"
        : currentRender === RENDERCOMPLETED
        ? "No completed tasks!"
        : "No tasks!"
  });
  return newPrompt;
}
