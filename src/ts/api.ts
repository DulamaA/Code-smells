//------Hämta API-adressen från miljövariabeln--------
const PODCAST_API_URL = import.meta.env.VITE_PODCAST_API_URL;

//------Kontrollera om variabeln är definierad--------
if (!PODCAST_API_URL) {
  throw new Error("VITE_PODCAST_API_URL är inte definierad i .env-filen");
}

//------Hämtar podcast-data från API:et---------------
export async function getPodcasts() {
  try {
    const response = await fetch(PODCAST_API_URL);
    if (!response.ok) {
      throw new Error(`API-anropet misslyckades: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Fel vid hämtning av poddar:", error);
    displayErrorMessage("Kunde inte hämta podcastdata. Försök igen senare.");
    return null;
  }
}

//----------Visa ett felmeddelande på sidan-------------
function displayErrorMessage(message: string): void {
  //Skapa en container för felmeddelanden
  let errorContainer = document.querySelector(
    ".error-message",
  ) as HTMLElement | null;
  if (!errorContainer) {
    errorContainer = document.createElement("div");
    errorContainer.className = "error-message";
    errorContainer.style.color = "red";
    errorContainer.style.margin = "1rem 0";
    errorContainer.style.textAlign = "center";
    document.body.prepend(errorContainer);
  }
  errorContainer.textContent = message;
}

export default getPodcasts;
