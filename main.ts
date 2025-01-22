import "./style.scss";
import { createHtml } from "./src/ts/createHtml";
import initializeDarkModeToggle from "./src/ts/darkModeToggle";

function initializeApplication() {
  initializeDarkModeToggle();
  createHtml();
}

initializeApplication();
