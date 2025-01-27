import "./style.scss";
import { createHtml } from "./src/ts/createHtml";
import initializeDarkModeToggle from "./src/ts/darkModeToggle";
import { log, error } from "./src/ts/logger";

function initializeApplication() {
  try {
    log("Startar applikationen...");
    initializeDarkModeToggle();
    log("Dark mode toggle är aktiverad.");

    createHtml();
    log("HTML-innehållet har genererats.");
  } catch (err) {
    error(`Ett fel uppstod vid initialisering av applikationen: ${err}`);
  }
}

initializeApplication();
