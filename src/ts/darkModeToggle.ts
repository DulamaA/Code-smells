const darkModeToggleButton = document.querySelector(
  ".toggle-btn",
) as HTMLButtonElement;
darkModeToggleButton.addEventListener("click", toggleDarkMode);

export function toggleDarkMode(): void {
  document.body.classList.toggle("darkmode");

  if (document.body.classList.contains("darkmode")) {
    darkModeToggleButton.textContent = "Aktivera ljusläge";
  } else {
    darkModeToggleButton.textContent = "Aktivera mörkt läge";
  }
}

export default toggleDarkMode;
