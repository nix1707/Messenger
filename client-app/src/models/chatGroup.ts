import { Media } from "./media";
import { Message } from "./message";
import { Profile } from "./profile";

export interface ChatGroup {
    id: string;
    image: Media | null;
    name: string;
    description: string;
    members: Profile[];
    lastMessage: Message
}