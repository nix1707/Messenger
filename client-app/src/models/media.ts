export enum MediaType {
  Image,
  Video,
  Audio,
}

export interface Media {
  id: string;
  type: MediaType;
  url: string;
}
