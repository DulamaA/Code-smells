export interface IPodcast {
  programurl: string;
  socialimage: string;
  description: string;
  name: string;
}

export interface IPodcastsResponse {
  programs: IPodcast[];
}
