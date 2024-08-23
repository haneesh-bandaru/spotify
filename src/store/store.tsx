import { create } from "zustand";

type AuthState = {
  isLoggedIn: boolean;
  userId: string | null;
  setIsLoggedIn: (status: boolean) => void;
  setUserId: (id: string | null) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem("Authorization"),
  userId: localStorage.getItem("userId") || null,
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
  setUserId: (id) => set({ userId: id }),
}));

export default useAuthStore;
