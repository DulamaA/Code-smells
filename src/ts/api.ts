import dotenv from "dotenv";

//------ Ladda miljövariabler från .env-filen---------
dotenv.config();

//------Hämta API-adressen från miljövariabeln--------
const PODCAST_API_URL = process.env.PODCAST_API_URL;

//------Kontrollera om variabeln är definierad--------
if (!PODCAST_API_URL) {
  throw new Error("PODCAST_API_URL är inte definierad i .env-filen");
}

//------Hämtar podcast-data från API:et---------------
export async function getPodcasts() {
  return await fetch(
    "https://api.sr.se/api/v2/programs/index?programcategoryid=133&format=json&pagination=false&indent=true&filter=program.archived&filterValue=false",
  )
    .then((data) => data.json())
    .then((json) => json)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error("Fel vid hämtning av poddar:", error);
      return null;
    });
}

export default getPodcasts;
