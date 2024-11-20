import { create } from "zustand";
import { User } from "../models/user";
import { agent } from "../api/api";

interface UserState {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  login: (creds: { email: string; password: string }) => Promise<void>;
  register: (creds: {
    displayName: string;
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  getUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  token: localStorage.getItem("jwt"),

  setUser: (user: User) => {
    localStorage.setItem("jwt", user.token);
    set({ user, token: user.token });
  },

  login: async (creds) => {
    await agent.Account.login(creds)
      .then((response) => {
        get().setUser(response.data);
      })
      .catch((error) => console.log("Login failed", error));
  },

  register: async (creds) => {
    await agent.Account.register(creds)
      .then((response) => {
        get().setUser(response.data);
      })
      .catch((error) => console.log("Registration failed", error));

  },

  logout: () => {
    localStorage.removeItem("jwt");
    set({ user: null, token: null });
  },

  getUser: async () => {
    if (!get().token) return;
    try {
      const user = await agent.Account.current();
      set({ user: user.data });
    } catch (error) {
      console.error(error);
    }
  },
}));
