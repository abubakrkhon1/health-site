// "use client";

// import { useState, useEffect, useCallback } from "react";
// import type { User } from "@supabase/supabase-js";
// import { getSupabaseClient } from "@/lib/supabase";

// interface Doctor {
//   id: string;
//   email: string;
//   full_name: string;
//   specialization?: string;
//   phone?: string;
//   license_number?: string;
// }

// interface AuthState {
//   user: User | null;
//   doctor: Doctor | null;
//   loading: boolean;
// }

// const AUTH_STORAGE_KEY = "clinic_auth";
// const DOCTOR_STORAGE_KEY = "clinic_doctor";

// export function useAuth() {
//   const [authState, setAuthState] = useState<AuthState>({
//     user: null,
//     doctor: null,
//     loading: true,
//   });

//   const supabase = getSupabaseClient();

//   // Load from localStorage
//   const loadFromStorage = useCallback(() => {
//     if (typeof window === "undefined") return null;

//     try {
//       const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
//       const storedDoctor = localStorage.getItem(DOCTOR_STORAGE_KEY);

//       return {
//         user: storedAuth ? JSON.parse(storedAuth) : null,
//         doctor: storedDoctor ? JSON.parse(storedDoctor) : null,
//       };
//     } catch (error) {
//       console.error("Error loading from localStorage:", error);
//       return null;
//     }
//   }, []);

//   // Save to localStorage
//   const saveToStorage = useCallback(
//     (user: User | null, doctor: Doctor | null) => {
//       if (typeof window === "undefined") return;

//       try {
//         if (user) {
//           localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
//         } else {
//           localStorage.removeItem(AUTH_STORAGE_KEY);
//         }

//         if (doctor) {
//           localStorage.setItem(DOCTOR_STORAGE_KEY, JSON.stringify(doctor));
//         } else {
//           localStorage.removeItem(DOCTOR_STORAGE_KEY);
//         }
//       } catch (error) {
//         console.error("Error saving to localStorage:", error);
//       }
//     },
//     []
//   );

//   // Fetch doctor profile from Supabase
//   const fetchDoctorProfile = useCallback(
//     async (email: string): Promise<Doctor | null> => {
//       try {
//         const { data, error } = await supabase
//           .from("doctors")
//           .select("*")
//           .eq("email", email)
//           .single();

//         if (data && !error) {
//           return data;
//         }
//         return null;
//       } catch (error) {
//         console.error("Error fetching doctor profile:", error);
//         return null;
//       }
//     },
//     [supabase]
//   );

//   // Initialize auth state
//   useEffect(() => {
//     const initializeAuth = async () => {
//       // First, try to load from localStorage
//       const stored = loadFromStorage();

//       if (stored?.user) {
//         setAuthState({
//           user: stored.user,
//           doctor: stored.doctor,
//           loading: false,
//         });

//         // Verify session is still valid and refresh doctor data
//         const {
//           data: { session },
//         } = await supabase.auth.getSession();

//         if (session?.user) {
//           // Session is valid, refresh doctor profile if needed
//           if (!stored.doctor || stored.user.email !== session.user.email) {
//             const doctor = await fetchDoctorProfile(session.user.email!);
//             setAuthState({
//               user: session.user,
//               doctor,
//               loading: false,
//             });
//             saveToStorage(session.user, doctor);
//           }
//         } else {
//           // Session expired, clear storage
//           setAuthState({ user: null, doctor: null, loading: false });
//           saveToStorage(null, null);
//         }
//       } else {
//         // No stored data, check for active session
//         const {
//           data: { session },
//         } = await supabase.auth.getSession();

//         if (session?.user) {
//           const doctor = await fetchDoctorProfile(session.user.email!);
//           setAuthState({
//             user: session.user,
//             doctor,
//             loading: false,
//           });
//           saveToStorage(session.user, doctor);
//         } else {
//           setAuthState({ user: null, doctor: null, loading: false });
//         }
//       }
//     };

//     initializeAuth();

//     // Listen for auth changes
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (event, session) => {
//       if (session?.user) {
//         const doctor = await fetchDoctorProfile(session.user.email!);
//         setAuthState({
//           user: session.user,
//           doctor,
//           loading: false,
//         });
//         saveToStorage(session.user, doctor);
//       } else {
//         setAuthState({ user: null, doctor: null, loading: false });
//         saveToStorage(null, null);
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [supabase, loadFromStorage, saveToStorage, fetchDoctorProfile]);

//   // Sign in function
//   const signIn = useCallback(
//     async (email: string, password: string) => {
//       try {
//         const { error } = await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });

//         if (error) {
//           return { error: error.message };
//         }

//         return {};
//       } catch (error) {
//         return { error: "An unexpected error occurred" };
//       }
//     },
//     [supabase]
//   );

//   // Sign up function
//   const signUp = useCallback(
//     async (
//       email: string,
//       password: string,
//       doctorData: Omit<Doctor, "id" | "email">
//     ) => {
//       try {
//         const { data, error: authError } = await supabase.auth.signUp({
//           email,
//           password,
//         });

//         if (authError) {
//           return { error: authError.message };
//         }

//         // Only create doctor profile if user was successfully created
//         if (data.user) {
//           const { error: profileError } = await supabase
//             .from("doctors")
//             .insert([
//               {
//                 email,
//                 ...doctorData,
//               },
//             ]);

//           if (profileError) {
//             console.error("Profile creation failed:", profileError);
//             return {
//               error: `Profile creation failed: ${profileError.message}`,
//             };
//           }
//         }

//         return {};
//       } catch (error) {
//         return { error: "An unexpected error occurred" };
//       }
//     },
//     [supabase]
//   );

//   // Sign out function
//   const signOut = useCallback(async () => {
//     try {
//       await supabase.auth.signOut();
//       setAuthState({ user: null, doctor: null, loading: false });
//       saveToStorage(null, null);
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   }, [supabase, saveToStorage]);

//   // Refresh doctor profile
//   const refreshDoctorProfile = useCallback(async () => {
//     if (authState.user?.email) {
//       const doctor = await fetchDoctorProfile(authState.user.email);
//       setAuthState((prev) => ({ ...prev, doctor }));
//       saveToStorage(authState.user, doctor);
//     }
//   }, [authState.user, fetchDoctorProfile, saveToStorage]);

//   return {
//     user: authState.user,
//     doctor: authState.doctor,
//     loading: authState.loading,
//     signIn,
//     signUp,
//     signOut,
//     refreshDoctorProfile,
//   };
// }
