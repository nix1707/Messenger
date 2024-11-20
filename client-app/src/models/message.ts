import { Media } from "./media";

export interface Message {
    id: string;
    createdAt: Date;
    body: string;
    username: string;
    media: Media | null;
}
