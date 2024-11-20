import { create } from "zustand";

interface CommonState {
    token: string | null;
    appLoaded: boolean;
    setToken: (token: string | null) => void;
    setAppLoaded: () => void;
  }
  
  export const useCommonStore = create<CommonState>((set) => ({
    token: localStorage.getItem('jwt') || null,
    appLoaded: false,
  
    setToken: (token) => {
      if (token) {
        localStorage.setItem('jwt', token);
      } else {
        localStorage.removeItem('jwt');
      }
      set({ token });
    },
  
    setAppLoaded: () => set({ appLoaded: true }),
  }));
  
  