import { getPodcasts } from "./api";
import { IPodcast, IPodcastsResponse } from "./interfaces";

export async function createHtml() {
  const podCastContainer = document.querySelector(
    ".section__podlist-pods",
  ) as HTMLElement | null;

  if (!podCastContainer) {
    // eslint-disable-next-line no-console
    console.error("Podcast containern hittades inte.");
    return; // Avbryt funktionen om containern saknas
  }

  let podCasts: IPodcastsResponse;

  try {
    // Försök att hämta data från API
    podCasts = await getPodcasts();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Kunde inte hämta data från API", error);
    return; // Avbryt om API-anropet misslyckas
  }

  // Iterera över poddlistan och skapa artiklar
  podCasts.programs.forEach((podcast: IPodcast) => {
    if (!isValidPodcast(podcast)) {
      // eslint-disable-next-line no-console
      console.warn("Hoppade över podcast med saknade fält", podcast);
      return;
    }
    createPodcastElement(podcast, podCastContainer);
  });
}

function isValidPodcast(podcast: IPodcast): boolean {
  return podcast.socialimage &&
    podcast.name &&
    podcast.description &&
    podcast.programurl
    ? true
    : false;
}

function createPodcastElement(podcast: IPodcast, container: HTMLElement): void {
  const innerArticle = createInnerArticle();

  const textDiv = createTextDiv();
  const img = createImage(
    podcast.socialimage,
    `Bild för podcasten ${podcast.name}`,
  );
  const header = createHeader(podcast.name);
  const description = createDescription(podcast.description);
  const link = createLink(podcast.programurl);

  // Montera element
  textDiv.append(header, description, link);
  innerArticle.append(img, textDiv);
  container.appendChild(innerArticle);
}

function createInnerArticle(): HTMLElement {
  const article = document.createElement("article");
  article.className = "section__article-innerarticle";

  return article;
}

function createTextDiv(): HTMLElement {
  const div = document.createElement("div");
  div.className = "section__article-div";
  return div;
}

function createImage(src: string, alt: string): HTMLImageElement {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.className = "podcast-image";
  img.width = 100;
  img.height = 100;
  return img;
}

function createHeader(title: string): HTMLElement {
  const header = document.createElement("h2");
  header.textContent = title;
  return header;
}

function createDescription(description: string): HTMLElement {
  const desc = document.createElement("p");
  desc.textContent = description;
  return desc;
}

function createLink(url: string): HTMLAnchorElement {
  const link = document.createElement("a");
  link.href = url;
  link.textContent = "Lyssna här";

  return link;
}

export default createHtml;
