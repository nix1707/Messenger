import { create } from "zustand";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { Message } from "../models/message";
import { agent } from "../api/api";
import moment from "moment";

interface MessageStore {
  messages: Message[];
  hubConnection: HubConnection | null;
  isSending: boolean;
  isLoading: boolean;
  createHubConnection: (chatGroupId: string, accessToken: string) => void;
  stopHubConnection: () => void;
  clear: (id: string) => Promise<void>;
  sendMessage: (values: any, file: File | null) => Promise<void>;
  loadMessages: (chatGroupId: string) => Promise<Message[]>;
  groupMessagesByDate: (messages: Message[]) => { [key: string]: Message[] };
}

export const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [],
  hubConnection: null,
  isSending: false,
  isLoading: false,

  createHubConnection: (chatGroupId: string, accessToken: string) => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5174/chat?chatGroupId=" + chatGroupId, {
        accessTokenFactory: () => accessToken,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    connection
      .start()
      .catch((error) =>
        console.log("Error establishing the connection: ", error)
      );

    connection.on("ReceiveMessage", (message: Message) => {
      set((state) => ({
        messages: [
          ...state.messages,
          { ...message, createdAt: new Date(message.createdAt) },
        ],
      }));
    });

    set({ hubConnection: connection });
  },

  stopHubConnection: () => {
    const hubConnection = get().hubConnection;
    if (hubConnection) {
      hubConnection
        .stop()
        .catch((error) => console.log("Error stopping connection: ", error));
    }
  },

  clear: async (id: string) => {
    set({ messages: [] });
    await agent.Messages.clear(id);
  },

  sendMessage: async (messageData, file) => {
    set({ isSending: true });
    const { hubConnection } = get();
    let media = null;

    if (file) {
      const res = await agent.Media.createUrl(file);
      media = res.data;
    }

    messageData.media = media;

    await hubConnection
      ?.invoke("SendMessage", messageData)
      .catch((error) => console.log("Failed to send message", error))
      .finally(() => set({ isSending: false }));
  },

  loadMessages: async (chatGroupId: string) => {
    set({ isLoading: true });
    var response = await agent.Messages.load(chatGroupId);
    set({ messages: response.data });
    set({ isLoading: false });

    return get().messages;
  },

  groupMessagesByDate: () => {
    const messages = get().messages;

    const groupedMessages: { [key: string]: Message[] } = {};

    messages.forEach((message) => {
      const date = moment(message.createdAt).format("DD/MM/YYYY");
      if (!groupedMessages[date]) {
        groupedMessages[date] = [];
      }
      groupedMessages[date].push(message);
    });

    return groupedMessages;
  },
}));
