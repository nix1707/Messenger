import { create } from "zustand";
import { Profile } from "../models/profile";
import { agent } from "../api/api";

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  loadProfile: (username: string) => Promise<void>;
}

const useProfileStore = create<ProfileState>((set) => ({
  loading: false,
  profile: null,

  loadProfile: async (username) => {
    set({loading: true});

    await agent.Profiles.loadProfile(username)
      .then((response) => set({ profile: response.data }))
      .catch((error) => console.log("Failed to load profile", error));

    set({loading: false})
  },
}));

export default useProfileStore;
