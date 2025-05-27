import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthStore, Doctor } from "@/types/types";
import type { User } from "@supabase/supabase-js";

// Extended interface to include hydration state
interface ExtendedAuthStore extends AuthStore {
  _hasHydrated: boolean;
}

export const useAuthStore = create<ExtendedAuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      doctor: null,
      _hasHydrated: false,

      setUser: (user: User | null) => set({ user }),
      clearUser: () => set({ user: null }),

      setDoctor: (doctor: Doctor | null) => set({ doctor }),
      clearDoctor: () => set({ doctor: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        doctor: state.doctor,
      }),
      onRehydrateStorage: () => (state: any) => {
        // Set hydration flag when storage is rehydrated
        state._hasHydrated = true;
      },
    }
  )
);
