import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserInfoStore = create(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (userInfo) => set({ userInfo }),
      clearUserInfo: () => set({ userInfo: null }),
    }),
    {
      name: "quadbiteUserInfo",
    }
  )
);

export default useUserInfoStore;
