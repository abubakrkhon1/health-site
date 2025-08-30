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
  doctor_id: string;
  patient_id: string;
  medical_card: {
    allergies: string[];
    birth_date: string;
    blood_type: string;
    chronic_conditions: string[];
    emergency_contact: {
      name: string;
      phone: string;
      relation: string;
    };
    full_name: string;
    gender: string;
    height_cm: number;
    id: string;
    medications: string[];
    patient_id: string;
    weight_kg: number;
  };
  doctor: {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    specialization: string;
  };
  patient: {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    gender: string;
    dob: string;
  };
};
