import Model from "./model";
import View from "./view";
import Controller from "./controller";

const newModel = new Model();
const newView = new View();
const toDoApp = new Controller(newModel, newView);
