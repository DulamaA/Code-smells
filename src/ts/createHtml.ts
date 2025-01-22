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

function createArticleElement(): HTMLElement {
  const article = document.createElement("article");
  article.className = "section__article-innerarticle";

  return article;
}

function createTextContainer(): HTMLElement {
  const div = document.createElement("div");
  div.className = "section__article-div";
  return div;
}

function createImageElement(src: string, alt: string): HTMLImageElement {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.className = "podcast-image";
  img.width = 100;
  img.height = 100;
  return img;
}

function createHeaderElement(title: string): HTMLElement {
  const header = document.createElement("h2");
  header.textContent = title;
  return header;
}

function createDescriptionElement(description: string): HTMLElement {
  const paragraph = document.createElement("p");
  paragraph.textContent = description;
  return paragraph;
}

function createLinkElement(url: string): HTMLAnchorElement {
  const link = document.createElement("a");
  link.href = url;
  link.textContent = "Lyssna här";

  return link;
}

export default createHtml;
