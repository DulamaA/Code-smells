import { getPodcasts } from "./api";
import { IPodcast, IPodcastsResponse } from "./interfaces";

const podCastContainer = document.querySelector(
  ".section__podlist-pods",
) as HTMLElement;

export async function createHtml() {
  const podCasts: IPodcastsResponse = await getPodcasts();

  podCasts.programs.forEach((podcast: IPodcast) => {
    const innerArticle = createInnerArticle();
    const textDiv = createTextDiv(innerArticle);
    const img = createImage(
      podcast.socialimage,
      `Bild för podcasten ${podcast.name}`,
    );
    innerArticle.appendChild(img);

    createHeader(textDiv, podcast.name);
    createP(textDiv, podcast.description);
    createLink(textDiv, podcast.programurl);
  });
}

function createInnerArticle(): HTMLElement {
  const innerArticle = document.createElement("article");
  innerArticle.setAttribute("class", "section__article-innerarticle");
  innerArticle.setAttribute("tabindex", "1");
  podCastContainer.appendChild(innerArticle);
  return innerArticle;
}

function createTextDiv(innerArticle: HTMLElement): HTMLElement {
  const textDiv = document.createElement("div");
  textDiv.setAttribute("class", "section__article-div");
  innerArticle.appendChild(textDiv);
  return textDiv;
}

function createLink(textDiv: HTMLElement, programUrl: string): void {
  const linkPlacement = document.createElement("a");
  const linkText = document.createTextNode("Lyssna här");
  linkPlacement.setAttribute("href", programUrl);
  linkPlacement.setAttribute("tabindex", "1");
  linkPlacement.appendChild(linkText);
  textDiv.appendChild(linkPlacement);
}

function createImage(
  src: string,
  alt: string = "",
  className: string = "podcast-image",
  width: number = 100,
  height: number = 100,
): HTMLImageElement {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.width = width;
  img.height = height;

  img.classList.add(className);

  return img;
}

function createP(textDiv: HTMLElement, description: string): void {
  const descPlacement = document.createElement("p");
  const desc = document.createTextNode(description);
  descPlacement.appendChild(desc);
  textDiv.appendChild(descPlacement);
}

function createHeader(textDiv: HTMLElement, programName: string): void {
  const headerPlacement = document.createElement("h2");
  const programNameText = document.createTextNode(programName);
  headerPlacement.appendChild(programNameText);
  textDiv.appendChild(headerPlacement);
}

export default createHtml;
