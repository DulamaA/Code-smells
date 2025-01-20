const toggleLightModeButton = document.querySelector(
  ".toggle-btn",
) as HTMLButtonElement;
toggleLightModeButton.addEventListener("click", toggleLightMode);
// eslint-disable-next-line no-console
console.log(toggleLightModeButton);

export function toggleLightMode(): void {
  document.body.classList.toggle("darkmode");

  if (document.body.classList.contains("darkmode")) {
    toggleLightModeButton.innerHTML = "Välj mörkt läge";
    // eslint-disable-next-line no-console
    console.log("mörkt läge");
  } else {
    toggleLightModeButton.innerHTML = "Välj ljust läge";
    // eslint-disable-next-line no-console
    console.log("ljust läge");
  }
}

//export default toggleLightMode;
