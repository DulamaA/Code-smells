const darkModeToggleButton = document.querySelector(
  ".toggle-btn",
) as HTMLButtonElement;

darkModeToggleButton.addEventListener("click", toggleDarkMode);

export function toggleDarkMode(): void {
  document.body.classList.toggle("darkmode");

  if (document.body.classList.contains("darkmode")) {
    darkModeToggleButton.textContent = "Välj ljusläge";
  } else {
    darkModeToggleButton.textContent = "Välj mörkt läge";
  }
}

export default toggleDarkMode;
