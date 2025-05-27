import React from "react";
import {
  Plus,
  Clock,
  Calendar,
  CheckCircle,
  DollarSign,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react";

export default function AppointmentsPage() {
  const stats = [
    {
      title: "Приёмы сегодня",
      value: "3",
      icon: Clock,
    },
    {
      title: "Предстоящие",
      value: "2",
      icon: Calendar,
    },
    {
      title: "Подтверждённые",
      value: "3",
      icon: CheckCircle,
    },
    {
      title: "Доход сегодня",
      value: "₽9 000",
      icon: DollarSign,
    },
  ];

  const appointments = [
    {
      name: "Иван Петров",
      age: 45,
      phone: "+7 (495) 123-45-67",
      date: "2024-01-20",
      time: "09:00",
      type: "Консультация",
      cost: "₽3 500",
      status: "confirmed",
      statusText: "Подтверждён",
    },
    {
      name: "Мария Сидорова",
      age: 32,
      phone: "+7 (495) 234-56-78",
      date: "2024-01-20",
      time: "10:30",
      type: "Повторный приём",
      cost: "₽2 500",
      status: "confirmed",
      statusText: "Подтверждён",
    },
    {
      name: "Алексей Козлов",
      age: 58,
      phone: "+7 (495) 345-67-89",
      date: "2024-01-20",
      time: "11:15",
      type: "Осмотр",
      cost: "₽3 000",
      status: "waiting",
      statusText: "Ожидает",
    },
    {
      name: "Елена Волкова",
      age: 28,
      phone: "+7 (495) 456-78-90",
      date: "2024-01-21",
      time: "14:00",
      type: "Консультация",
      cost: "₽4 000",
      status: "completed",
      statusText: "Завершён",
    },
    {
      name: "Дмитрий Новиков",
      age: 41,
      phone: "+7 (495) 567-89-01",
      date: "2024-01-22",
      time: "15:30",
      type: "Повторный приём",
      cost: "₽3 200",
      status: "confirmed",
      statusText: "Подтверждён",
    },
  ];

  const getStatusColor = (status: any) => {
    switch (status) {
      case "confirmed":
        return "dark:bg-green-900/50 dark:text-green-400 dark:border-green-800 bg-green-50 text-green-700 border-green-200";
      case "waiting":
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
                    <IconComponent className="h-4 w-4 dark:text-white/70" />
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
                <h3 className="text-lg font-semibold dark:text-white/90">Все приёмы</h3>
                <p className="text-sm dark:text-white/50">Управление записями на приём</p>
              </div>
              <button className="w-fit h-9 px-4 py-2 bg-slate-700 text-white/90 text-sm font-medium rounded-md hover:bg-slate-600 transition-colors flex items-center justify-center space-x-2 max-w-[200px]">
                <Plus className="h-4 w-4" />
                <span>Новый приём</span>
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {appointments.map((appointment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg dark:hover:bg-slate-800 hover:bg-gray-50 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="font-medium dark:text-white/90">{appointment.name}</p>
                    <p className="text-sm dark:text-white/50">{appointment.type}</p>
                    <div className="flex items-center space-x-2 text-sm dark:text-white/40">
                      <Clock className="h-4 w-4" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                      {appointment.statusText}
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
