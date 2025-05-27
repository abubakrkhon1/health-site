"use client";

import React from "react";
import {
  Calendar,
  Clock,
  Users,
  DollarSign,
  FileText,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/ui/avatar";

export default function Dashboard() {
  const stats = [
    {
      title: "Приёмы сегодня",
      value: "12",
      change: "+3 с вчера",
      changeType: "positive",
      icon: Calendar,
    },
    {
      title: "Всего пациентов",
      value: "1,234",
      change: "+12 в этом месяце",
      changeType: "positive",
      icon: Users,
    },
    {
      title: "Доход сегодня",
      value: "₽184,500",
      change: "-8% с вчера",
      changeType: "negative",
      icon: DollarSign,
    },
    {
      title: "Медицинские записи",
      value: "2,456",
      change: "+5 на этой неделе",
      changeType: "positive",
      icon: FileText,
    },
  ];

  const todayAppointments = [
    {
      name: "Иван Петров",
      type: "Консультация",
      time: "09:00",
      status: "confirmed",
      statusText: "подтверждён",
    },
    {
      name: "Мария Сидорова",
      type: "Повторный приём",
      time: "10:30",
      status: "confirmed",
      statusText: "подтверждён",
    },
    {
      name: "Алексей Козлов",
      type: "Осмотр",
      time: "11:15",
      status: "waiting",
      statusText: "ожидает",
    },
    {
      name: "Елена Волкова",
      type: "Консультация",
      time: "14:00",
      status: "completed",
      statusText: "завершён",
    },
    {
      name: "Дмитрий Новиков",
      type: "Повторный приём",
      time: "15:30",
      status: "confirmed",
      statusText: "подтверждён",
    },
  ];

  const upcomingReminders = [
    {
      title: "Повторный приём с Иваном Петровым",
      time: "Завтра в 9:00",
      priority: "high",
    },
    {
      title: "Просмотр результатов анализов - Мария Сидорова",
      time: "Сегодня в 16:00",
      priority: "medium",
    },
    {
      title: "Звонок Алексею Козлову по поводу приёма",
      time: "Пятница в 10:00",
      priority: "low",
    },
  ];

  const getStatusColor = (status: any) => {
    switch (status) {
      case "confirmed":
        return "bg-green-50 text-green-700 border-green-200";
      case "waiting":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:text-black dark:bg-green-500";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPriorityIndicator = (priority: any) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  const doctor = useAuthStore((s) => s.doctor);
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
          {/* Header Skeleton */}
          <div className="space-y-2">
            <div className="h-8 w-48 bg-gray-300 dark:bg-slate-700 rounded" />
            <div className="h-4 w-80 bg-gray-200 dark:bg-slate-600 rounded" />
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 dark:bg-slate-800 rounded-lg border shadow-sm p-6"
              >
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-300 dark:bg-slate-600 rounded" />
                  <div className="h-6 w-20 bg-gray-400 dark:bg-slate-700 rounded" />
                  <div className="h-3 w-24 bg-gray-300 dark:bg-slate-600 rounded" />
                </div>
                <div className="h-8 w-8 bg-gray-300 dark:bg-slate-600 rounded-md mt-4" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Appointments Skeleton */}
            <div className="lg:col-span-2 bg-gray-100 dark:bg-slate-800 rounded-lg border shadow-sm">
              <div className="p-6 border-b border-gray-300 dark:border-white/50">
                <div className="h-4 w-48 bg-gray-300 dark:bg-slate-700 rounded mb-2" />
                <div className="h-3 w-64 bg-gray-200 dark:bg-slate-600 rounded" />
              </div>
              <div className="p-6 space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-200 dark:bg-slate-700"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-gray-400 dark:bg-slate-600" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-gray-300 dark:bg-slate-600 rounded" />
                        <div className="h-3 w-24 bg-gray-200 dark:bg-slate-500 rounded" />
                      </div>
                    </div>
                    <div className="h-4 w-16 bg-gray-300 dark:bg-slate-600 rounded-full" />
                  </div>
                ))}
                <div className="mt-6 pt-4 border-t border-gray-300 dark:border-white/50">
                  <div className="h-9 bg-gray-300 dark:bg-slate-600 rounded-md" />
                </div>
              </div>
            </div>

            {/* Reminders Skeleton */}
            <div className="bg-gray-100 dark:bg-slate-800 rounded-lg border shadow-sm">
              <div className="p-6 border-b border-gray-300 dark:border-white/50">
                <div className="h-4 w-48 bg-gray-300 dark:bg-slate-700 rounded mb-2" />
                <div className="h-3 w-64 bg-gray-200 dark:bg-slate-600 rounded" />
              </div>
              <div className="p-6 space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-56 bg-gray-300 dark:bg-slate-600 rounded" />
                    <div className="h-3 w-32 bg-gray-200 dark:bg-slate-500 rounded" />
                  </div>
                ))}
                <div className="mt-6 pt-4 border-t border-gray-300 dark:border-white/50">
                  <div className="h-9 bg-gray-300 dark:bg-slate-600 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white/90">
            Панель управления
          </h1>
          <p className="text-gray-700 dark:text-white/40">
            Добро пожаловать, Доктор{" "}
            {loading ? (
              "..."
            ) : (
              <strong>{doctor?.full_name.split(" ")[0]}</strong>
            )}
            . Вот обзор вашей практики.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-gray-100 dark:bg-slate-800 rounded-lg border shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600 dark:text-white/50">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-semibold text-black dark:text-white/90">
                      {stat.value}
                    </p>
                    <p
                      className={`text-xs ${
                        stat.changeType === "positive"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                  <div className="h-8 w-8 bg-gray-200 dark:bg-slate-600 rounded-md flex items-center justify-center">
                    <IconComponent className="h-4 w-4 text-gray-700 dark:text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Appointments */}
          <div className="lg:col-span-2 bg-gray-100 dark:bg-slate-800 rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-300 dark:border-white/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    Приёмы сегодня
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-white/50">
                    Ваше расписание на сегодня
                  </p>
                </div>
                <button className="h-8 w-8 p-2 rounded-md border border-gray-300 dark:border-white/50 hover:bg-gray-200 dark:hover:bg-slate-600 flex items-center justify-center transition">
                  <MoreHorizontal className="h-4 w-4 text-gray-700 dark:text-white" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {todayAppointments.map((appointment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 hover:cursor-pointer transition"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-800 flex items-center justify-center">
                        <span className="text-sm font-medium text-black dark:text-white">
                          {appointment.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-black dark:text-white">
                          {appointment.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-white/50">
                          {appointment.type} • {appointment.time}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.statusText}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-300 dark:border-white/50">
                <button className="w-full h-9 px-4 py-2 bg-gray-300 dark:bg-slate-700 text-black dark:text-white text-sm font-medium rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center space-x-2">
                  <span>Посмотреть все приёмы</span>
                  <ChevronRight className="h-4 w-4 text-gray-700 dark:text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Upcoming Reminders */}
          <div className="bg-gray-100 dark:bg-slate-800 rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-300 dark:border-white/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    Предстоящие напоминания
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-white/50">
                    Не пропустите эти важные задачи
                  </p>
                </div>
                <button className="h-8 w-8 p-1 rounded-md border border-gray-300 dark:border-white/50 hover:bg-gray-200 dark:hover:bg-slate-600 flex items-center justify-center transition">
                  <MoreHorizontal className="h-4 w-4 text-gray-700 dark:text-white" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingReminders.map((reminder, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition hover:cursor-pointer"
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${getPriorityIndicator(
                          reminder.priority
                        )}`}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-5 text-black dark:text-white">
                          {reminder.title}
                        </p>
                        <div className="flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1 text-gray-700 dark:text-white" />
                          <p className="text-xs text-gray-600 dark:text-white/50">
                            {reminder.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-300 dark:border-white/50">
                <button className="w-full h-9 px-4 py-2 border border-gray-300 dark:border-slate-600 text-black dark:text-white text-sm font-medium rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center space-x-2">
                  <span>Посмотреть все напоминания</span>
                  <ChevronRight className="h-4 w-4 text-gray-700 dark:text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
