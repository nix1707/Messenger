import { ChatGroup } from "../models/chatGroup";
import { agent } from "../api/api";
import { create } from "zustand";
import { v4 as guid } from "uuid";
import { Message } from "../models/message";

interface ChatGroupStore {
  chatGroups: ChatGroup[];
  exploreList: ChatGroup[];
  selectedChatGroup: ChatGroup | null;
  loading: boolean;
  loadChatGroups: () => Promise<void>;
  loadDetails: (groupId: string) => Promise<ChatGroup | null>;
  loadExploreList: () => Promise<void>;
  selectChatGroup: (id: string) => void;
  create: (name: string, description: string) => Promise<void>;
  clearSelectedChatGroup: () => void;
  setLastMessage: (groupId: string, message: Message) => void;
}

export const useChatGroupStore = create<ChatGroupStore>((set, get) => ({
  chatGroups: [],
  exploreList: [],
  selectedChatGroup: null,
  loading: false,

  loadChatGroups: async () => {
    set({ loading: true });

    await agent.ChatGroups.list()
      .then((response) => set({ chatGroups: response.data }))
      .catch((error) => console.log("Failed to load chat groups", error))
      .finally(() => set({ loading: false }));
  },

  loadDetails: async (groupId) => {
    const response = await agent.ChatGroups.details(groupId);
    return response.data;
  },

  create: async (name, description) => {
    set({ loading: true });

    await agent.ChatGroups.create({
      id: guid(),
      name,
      description,
      createdAt: new Date(),
    })
      .catch((error) => console.log("Failed to create chat group", error))
      .finally(() => set({ loading: false }));
  },

  loadExploreList: async () => {
    set({ loading: true });

    await agent.ChatGroups.exploreList()
      .then((response) => set({ exploreList: response.data }))
      .catch((error) => console.log("Failed to load explore list", error))
      .finally(() => set({ loading: false }));
  },

  selectChatGroup: (id) => {
    set((state) => ({
      selectedChatGroup: state.chatGroups.find((group) => group.id === id),
    }));
  },

  clearSelectedChatGroup: () => {
    set({ selectedChatGroup: null });
  },

  setLastMessage: (groupId, message) => {
    const chatGroup = get().chatGroups.find((g) => g.id === groupId);

    if (chatGroup) chatGroup.lastMessage = message;
  },
}));
