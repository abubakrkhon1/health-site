"use client";
import React, { useEffect, useState } from "react";
import {
  Plus,
  Clock,
  Calendar,
  CheckCircle,
  DollarSign,
  Eye,
  Edit,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Appointment } from "@/types/types";
import { format } from "date-fns";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const { loading, user } = useAuth();
  const [appLoading, setAppLoading] = useState(true);

  // Fetching Appointments from Supabase database
  useEffect(() => {
    if (!user?.id) return;
    const fetchAppointments = async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select(
          `*,
            client:clients (*),
            doctor:doctors (*)`
        )
        .eq("doctor_id", user?.id)
        .order("scheduled_at", { ascending: false });

      if (error) {
        console.error("Error fetching appointments:", error.message);
        return;
      }

      setAppointments(data as []);
      setAppLoading(false);
    };
    fetchAppointments();
  }, [user?.id]);

  const stats = [
    {
      title: "Приёмы сегодня",
      value: "#",
      icon: Clock,
    },
    {
      title: "Предстоящие",
      value: "#",
      icon: Calendar,
    },
    {
      title: "Подтверждённые",
      value: "#",
      icon: CheckCircle,
      color: 'blue'
    },
    {
      title: "Что-то",
      value: "#",
      icon: DollarSign,
      color: 'green'
    },
  ];

  const getStatusColor = (status: any) => {
    switch (status) {
      case "confirmed":
        return "dark:bg-green-900/50 dark:text-green-400 dark:border-green-800 bg-green-50 text-green-700 border-green-200";
      case "pending":
        return "dark:bg-yellow-900/50 dark:text-yellow-400 dark:border-yellow-800 bg-yellow-50 text-yellow-700 border-yellow-200";
      case "completed":
        return "dark:bg-blue-900/50 dark:text-blue-400 dark:border-blue-800 bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight dark:text-white/90">
            Приёмы
          </h1>
          <p className="dark:text-white/40">
            Управление расписанием приёмов и пациентами
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="dark:bg-slate-900 rounded-lg border shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium dark:text-white/50">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-semibold dark:text-white/90">
                      {stat.value}
                    </p>
                  </div>
                  <div className="h-8 w-8 bg-gray-100 dark:bg-slate-600 rounded-md flex items-center justify-center">
                    <IconComponent color={stat.color} className="h-4 w-4 dark:text-white/70" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Appointments Table */}
        <div className="dark:bg-slate-900 rounded-lg border shadow-sm">
          <div className="p-6 border-b dark:border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold dark:text-white/90">
                  Все приёмы
                </h3>
                <p className="text-sm dark:text-white/50">
                  Управление записями на приём
                </p>
              </div>
              <button className="w-fit h-9 px-4 py-2 bg-slate-700 text-white/90 text-sm font-medium rounded-md hover:bg-slate-600 transition-colors flex items-center justify-center space-x-2 max-w-[200px]">
                <Plus className="h-4 w-4" />
                <span>Новый приём</span>
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {appLoading
                ? Array.from({ length: 4 }).map((_, id) => (
                    <div
                      key={id}
                      className="flex h-16 animate-pulse bg-gray-200 items-center justify-between p-4 rounded-lg dark:hover:bg-slate-800 hover:bg-gray-200 transition-colors"
                    ></div>
                  ))
                : appointments.map((appt: Appointment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg dark:hover:bg-slate-800 hover:bg-gray-50 transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="font-medium dark:text-white/90">
                          {appt.client.full_name}
                        </p>
                        <p className="text-sm dark:text-white/50">
                          {appt.notes || "Notes..."}
                        </p>
                        <div className="flex items-center space-x-2 text-sm dark:text-white/40">
                          <Clock className="h-4 w-4" />
                          <span>
                            {format(
                              new Date(appt.scheduled_at),
                              "dd MMM yyyy, HH:mm"
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                            appt.status
                          )}`}
                        >
                          {appt.status}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-slate-700 rounded-md transition-colors">
                            <Eye className="h-4 w-4 dark:text-white/70" />
                          </button>
                          <button className="p-2 hover:bg-slate-700 rounded-md transition-colors">
                            <Edit className="h-4 w-4 dark:text-white/70" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
