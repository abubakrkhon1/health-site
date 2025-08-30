"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const doctor = useAuthStore((s) => s.doctor);
  const hasHydrated = useAuthStore((s) => s._hasHydrated); // Add this to check hydration

  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);
  const setDoctor = useAuthStore((s) => s.setDoctor);
  const clearDoctor = useAuthStore((s) => s.clearDoctor);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const restoreSession = async () => {
      if (!hasHydrated) return;

      try {
        // Only fetch if we don't have complete data after hydration
        if (!user || !doctor) {
          const { data: sessionData } = await supabase.auth.getSession();
          const currentUser = sessionData?.session?.user ?? null;

          if (mounted) {
            setUser(currentUser);

            if (currentUser) {
              const { data: profile, error } = await supabase
                .from("doctors")
                .select("*")
                .eq("id", currentUser.id)
                .maybeSingle();

              if (mounted) {
                if (profile && !error) {
                  setDoctor(profile);
                } else {
                  clearDoctor();
                  setError(error?.message || null);
                }
              }
            }
          }
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error ? err.message : "Session restore failed"
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    restoreSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          clearUser();
          clearDoctor();
        }
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [hasHydrated]); // Add hasHydrated to dependencies

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      setLoading(false);
      return { error: error?.message || "Login failed" };
    }

    const { data: doctorProfile, error: profileError } = await supabase
      .from("doctors")
      .select("*")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profileError || !doctorProfile) {
      setLoading(false);
      return {
        error:
          "Failed to load doctor profile: " + profileError?.message ||
          "Not found",
      };
    }

    setUser(data.user);
    setDoctor(doctorProfile);
    setLoading(false);

    return { error: null };
  };

  const signUp = async (formData: {
    email: string;
    password: string;
    full_name: string;
    specialization: string;
    phone: string;
  }) => {
    const { email, password, full_name, specialization, phone } = formData;

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError || !data.user)
      return { error: authError?.message || "Signup failed" };

    setUser(data.user);

    const { data: doctorProfile, error: profileError } = await supabase
      .from("doctors")
      .insert([
        {
          id: data.user.id,
          email,
          full_name,
          specialization,
          phone,
        },
      ])
      .select("*");

    if (profileError || !doctorProfile?.[0]) {
      return {
        error:
          "Doctor profile creation failed: " + profileError?.message ||
          "Not created",
      };
    }

    setDoctor(doctorProfile[0]);
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    clearUser();
    clearDoctor();
    router.push("/sign-in");
  };

  return {
    user,
    doctor,
    loading,
    error,
    signIn,
    signUp,
    signOut,
  };
}
