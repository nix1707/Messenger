import axios from "axios";
import { useCommonStore } from "../state/useCommonStore";
import { User } from "../models/user";
import { ChatGroup } from "../models/chatGroup";
import { Media as MediaModel } from "../models/media";
import { Message } from "../models/message";
import { Profile } from "../models/profile";

axios.defaults.baseURL = "http://localhost:5174/api";

axios.interceptors.request.use((config) => {
  const token = useCommonStore.getState().token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const Account = {
  current: () => axios.get<User>("/account"),
  login: (creds: { email: string; password: string }) =>
    axios.post<User>("/account/login", creds),
  
  register: (creds: {
    displayName: string;
    username: string;
    email: string;
    password: string;
  }) => axios.post<User>("/account/register", creds),
};

const ChatGroups = {
  list: () => axios.get<ChatGroup[]>("/groups?joinedOnly=true"),
  create: (values: {id: string, name: string, description: string, createdAt: Date}) => axios.post('/groups', values),
  exploreList: () => axios.get<ChatGroup[]>("/groups?joinedOnly=false"),
  updateMembership: (id: string) => axios.post<void>(`/groups/${id}/join`),
  details: (id: string) => axios.get<ChatGroup>(`/groups/${id}`)
};

const Media = {
  createUrl: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post<MediaModel>("/media", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

const Messages = {
  load: (id: string) => axios.get<Message[]>(`/messages/chatGroup/${id}`),
  clear: (id: string) => axios.delete<void>(`/messages/chatGroup/${id}`),
};

const Profiles = {
  loadProfile: (username: string) => axios.get<Profile>(`/profiles/${username}`)
}

export const agent = {
  Account,
  ChatGroups,
  Media,
  Messages,
  Profiles
};
