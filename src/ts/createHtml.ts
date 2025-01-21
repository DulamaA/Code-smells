import { getPodcasts } from "./api";

const podCastContainer = document.querySelector(
  ".section__podlist-pods",
) as HTMLElement;

if (!podCastContainer) {
  // eslint-disable-next-line no-console
  console.error("Container element not found!");
  throw new Error("Unable to find container for podcasts.");
}

interface IPodcast {
  programurl: string;
  socialimage: string;
  description: string;
  name: string;
}

interface IPodcastsResponse {
  programs: IPodcast[];
}

export async function createHtml(): Promise<void> {
  const podCasts: IPodcastsResponse = await getPodcasts();

  podCasts.programs.forEach((podcast) => {
    const innerArticle = createInnerArticle();
    const textDiv = createTextDiv(innerArticle);

    createImg(podcast, innerArticle);
    createHeader(podcast, textDiv);
    createP(podcast, textDiv);
    createLink(podcast, textDiv);

    function createInnerArticle(): HTMLElement {
      const innerArticle = document.createElement("article");
      innerArticle.setAttribute("class", "section__article-innerarticle");
      innerArticle.setAttribute("tabindex", "1");
      podCastContainer.appendChild(innerArticle);
      return innerArticle;
    }

    function createTextDiv(parent: HTMLElement): HTMLElement {
      const textDiv = document.createElement("div");
      textDiv.setAttribute("class", "section__article-div");
      parent.appendChild(textDiv);
      return textDiv;
    }

    function createLink(podcast: IPodcast, parent: HTMLElement): void {
      const linkPlacement = document.createElement("a");
      const linkText = document.createTextNode("Lyssna här");
      linkPlacement.setAttribute("href", podcast.programurl);
      linkPlacement.setAttribute("tabindex", "1");
      linkPlacement.appendChild(linkText);
      parent.appendChild(linkPlacement);
    }
    function createImg(podcast: IPodcast, parent: HTMLElement): void {
      const imgPlacement = document.createElement("img");
      imgPlacement.setAttribute("src", podcast.socialimage);
      imgPlacement.setAttribute("alt", podcast.name || "Podcast-bild");
      imgPlacement.setAttribute("width", "100");
      imgPlacement.setAttribute("height", "100");
      parent.appendChild(imgPlacement);
    }

    function createP(podcast: IPodcast, parent: HTMLElement): void {
      const descPlacement = document.createElement("p");
      const desc = document.createTextNode(podcast.description);
      descPlacement.appendChild(desc);
      parent.appendChild(descPlacement);
    }

    function createHeader(podcast: IPodcast, parent: HTMLElement): void {
      const headerPlacement = document.createElement("h2");
      const programName = document.createTextNode(podcast.name);
      headerPlacement.appendChild(programName);
      parent.appendChild(headerPlacement);
    }
  });
}

export default createHtml;
