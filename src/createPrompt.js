import createElement from "./createElement";
import { RENDERPENDING, RENDERCOMPLETED } from "./constants";

export default function createPrompt(currentRender) {
  const newPromptLI = createElement({ tag: "li" });
  const span = createElement({
    tag: "span",
    class: ["noTasks"],
    textContent:
      currentRender === RENDERPENDING
        ? "No pending tasks!"
        : currentRender === RENDERCOMPLETED
        ? "No completed tasks!"
        : "No tasks!"
  });
  newPromptLI.append(span);
  return newPromptLI;
}
