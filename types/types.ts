import { User } from "@supabase/supabase-js";

export type AuthStore = {
  user: User | null;
  doctor: Doctor | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  setDoctor: (doctor: Doctor | null) => void;
  clearDoctor: () => void;
};

export type Doctor = {
  avatar: "https://github.com/shadcn.png";
  email: string;
  full_name: string;
  specialization: string;
  phone: string;
};
