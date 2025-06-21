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

export type AppointmentCardProps = {
  appointment: {
    id: string;
    scheduled_at: string;
    status: string;
    notes: string | null;
    created_at: string;
    doctor: {
      full_name: string;
      email: string;
      phone: string;
    };
    client: {
      full_name: string;
      email: string;
      phone: string;
      gender: string;
      dob: string;
    };
  };
};

export type Appointment = {
    id: string;
    scheduled_at: string;
    status: string;
    notes: string | null;
    created_at: string;
    doctor: {
      full_name: string;
      email: string;
      phone: string;
    };
    client: {
      full_name: string;
      email: string;
      phone: string;
      gender: string;
      dob: string;
    };
};
