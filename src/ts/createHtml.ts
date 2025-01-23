import { getPodcasts } from "./api";
import { IPodcast, IPodcastsResponse } from "./interfaces";

/**
 * Huvudfunktion för att skapa och rendera podcast listan
 * Hämtar data från API:et, validerar och generar HTML för varje podcast.
 */
export async function createHtml() {
  const podCastContainer = document.querySelector(
    ".section__podlist-pods",
  ) as HTMLElement | null;

  //----- Kontrollera om podcast container finns--------
  if (!podCastContainer) {
    // eslint-disable-next-line no-console
    console.error("Podcast containern hittades inte.");
    //-----avbryt om containern saknas------------------
    return;
  }

  let podCasts: IPodcastsResponse;

  try {
    //------Hämta data från API--------------------------
    podCasts = await getPodcasts();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Kunde inte hämta data från API", error);
    //----- Avbryt om API-anropet misslyckas-------------
    return;
  }

  // Iterera över varje podcast och skapa dess HTML-element
  podCasts.programs.forEach((podcast: IPodcast) => {
    if (!isPodcastValid(podcast)) {
      // eslint-disable-next-line no-console
      console.warn("Hoppade över podcast med saknade fält", podcast);
      return;
    }
    createPodcastElement(podcast, podCastContainer);
  });
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
  article.className = "section__article-innerarticle";

  return article;
}

//Skapar en div-container för textinnehållet-------------------
function createTextContainer(): HTMLElement {
  const div = document.createElement("div");
  div.className = "section__article-div";
  return div;
}

//Skapar ett img-element för podcastens bild--------------------
function createImageElement(src: string, alt: string): HTMLImageElement {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt || "Bild saknar beskrivning";
  img.className = "podcast-image";
  img.width = 100;
  img.height = 100;
  return img;
}

//Skapar ett h2-element för podcastens titel--------------------
function createHeaderElement(title: string): HTMLElement {
  const header = document.createElement("h2");
  header.textContent = title;
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

  return link;
}

export default createHtml;
