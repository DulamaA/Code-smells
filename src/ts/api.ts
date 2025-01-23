//------Hämta API-adressen från miljövariabeln--------
const PODCAST_API_URL = import.meta.env.VITE_PODCAST_API_URL;

//------Kontrollera om variabeln är definierad--------
if (!PODCAST_API_URL) {
  throw new Error("vITE_PODCAST_API_URL är inte definierad i .env-filen");
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
    console.error("Fel vid hämtning av poddar:", error);
    return null;
  }
}

export default getPodcasts;
