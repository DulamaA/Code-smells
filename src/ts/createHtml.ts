import { getPodcasts } from "./api";
import { IPodcast, IPodcastsResponse } from "./interfaces";
import { log, warn, error } from "./logger";

/**
 * Huvudfunktion för att skapa och rendera podcast listan
 * Hämtar data från API:et, validerar och generar HTML för varje podcast.
 */
export async function createHtml() {
  const podCastContainer = document.querySelector(
    ".podlist",
  ) as HTMLElement | null;

  //----- Kontrollera om podcast container finns--------
  if (!podCastContainer) {
    error("Podcast containern hittades inte.");
    //-----avbryt om containern saknas------------------
    return;
  }

  let podCasts: IPodcastsResponse;

  try {
    //------Hämta data från API--------------------------
    log("Hämtar podcast-data från API...");
    podCasts = await getPodcasts();
    log("Podcast-data hämtades framgångsrikt.");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    error("Kunde inte hämta data från API: ${err}");
    //----- Avbryt om API-anropet misslyckas-------------
    return;
  }

  // Iterera över varje podcast och skapa dess HTML-element
  podCasts.programs.forEach((podcast: IPodcast) => {
    if (!isPodcastValid(podcast)) {
      warn("Hoppade över podcast med saknade fält");
      return;
    }
    createPodcastElement(podcast, podCastContainer);
  });

  log("Podcast-listan har renderats.");
}

function isPodcastValid(podcast: IPodcast): boolean {
  return !!(
    podcast.socialimage &&
    podcast.name &&
    podcast.description &&
    podcast.programurl
  );
}

//Skapar och lägger till ett podcast-element i angiven container
function createPodcastElement(podcast: IPodcast, container: HTMLElement): void {
  const articleElement = createArticleElement();

  const textContainer = createTextContainer();
  const imageElement = createImageElement(
    podcast.socialimage,
    `Bild för podcasten ${podcast.name}`,
  );
  const headerElement = createHeaderElement(podcast.name);
  const descriptionElement = createDescriptionElement(podcast.description);
  const linkElement = createLinkElement(podcast.programurl);

  // Montera element
  textContainer.append(headerElement, descriptionElement, linkElement);
  articleElement.append(imageElement, textContainer);
  container.appendChild(articleElement);
}

//Skapar ett article-element för att representera en podcast
function createArticleElement(): HTMLElement {
  const article = document.createElement("article");
  article.className = "podlist_item";

  return article;
}

//Skapar en div-container för textinnehållet-------------------
function createTextContainer(): HTMLElement {
  const div = document.createElement("div");
  div.className = "podlist_text";
  return div;
}

//Skapar ett img-element för podcastens bild--------------------
function createImageElement(src: string, alt: string): HTMLImageElement {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt || "Bild saknar beskrivning";
  img.className = "podlist_image";
  img.width = 100;
  img.height = 100;
  return img;
}

//Skapar ett h2-element för podcastens titel--------------------
function createHeaderElement(title: string): HTMLElement {
  const header = document.createElement("h2");
  header.textContent = title;
  header.className = "podlist_title";
  return header;
}

//Skapar ett p-element för podcastens beskrivning---------------
function createDescriptionElement(description: string): HTMLElement {
  const paragraph = document.createElement("p");
  paragraph.textContent = description;
  return paragraph;
}

//Skapar ett a-element för att länka till podcastens webbsida----
function createLinkElement(url: string): HTMLAnchorElement {
  const link = document.createElement("a");
  link.href = url;
  link.textContent = "Lyssna här";
  link.className = "podlist_link";
  link.setAttribute("aria-label", "Lyssna på podcastens avsnitt");

  return link;
}

export default createHtml;
