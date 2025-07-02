"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  Calendar,
  MapPin,
  Phone,
  AlertTriangle,
  Pill,
  Heart,
  Droplets,
  Ruler,
  UserCheck,
  Stethoscope,
  ArrowLeft,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { format, parse } from "date-fns";
import { ru } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Appointment } from "@/types/types";

export default function AppointmentInfoPage() {
  const { user } = useAuth();
  const [appLoading, setAppLoading] = useState(true);
  const { appointment_id } = useParams();
  const [appointment, setAppointment] = useState<Appointment>();
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.id) return;
    const fetchAppointment = async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select(
          `*,
              patient:clients (*),
              doctor:doctors (*),
              medical_card:medical_cards (*)`
        )
        .eq("doctor_id", user?.id)
        .eq("id", appointment_id)
        .single();
      console.log(data);

      if (error) {
        console.error("Error fetching appointments:", error.message);
        setError(error.message);
        return;
      }

      setAppointment(data as any);
      setAppLoading(false);
    };
    fetchAppointment();
  }, [user?.id]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "Подтверждено";
      case "pending":
        return "В процессе";
      case "completed":
        return "Завершено";
      case "cancelled":
        return "Отменено";
      default:
        return status;
    }
  };

  const getSpecialization = (spec: string) => {
    switch (spec) {
      case "Cardiology":
        return "Кардиолог";
    }
  };

  const getRelation = (relation: string) => {
    switch (relation) {
      case "Friend":
        return "Друг";
    }
  };

  if (appLoading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex gap-x-4 items-center">
              <div className="p-2 hover:bg-gray-200 hover:cursor-pointer transition rounded">
                <ArrowLeft size={32} onClick={() => router.back()} />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Информация о приёме
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Детали приёма и медицинская карта пациента
                </p>
              </div>
            </div>
            <div className="w-16 h-5 rounded bg-gray-500 animate-pulse"></div>
          </div>

          {/* Appointment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Детали приёма
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Дата и время
                  </div>
                  <div className="space-y-1">
                    <div className="w-48 h-4 bg-gray-400 rounded animate-pulse"></div>
                    <div className="w-48 h-4 bg-gray-400 rounded animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Врач
                  </div>
                  <div className="space-y-1">
                    <div className="w-48 h-4 bg-gray-400 rounded animate-pulse"></div>
                    <div className="w-48 h-4 bg-gray-400 rounded animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    Местоположение
                  </div>
                  <div className="space-y-1">
                    <div className="w-48 h-4 bg-gray-400 rounded animate-pulse"></div>
                    <div className="w-48 h-4 bg-gray-400 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Примечания
                </h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="w-48 h-4 bg-gray-400 rounded animate-pulse"></div>
                  <div className="w-48 h-4 bg-gray-400 rounded animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <User className="h-5 w-5 mr-2 text-green-600" />
                Информация о пациенте
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-lg font-medium animate-pulse">
                    <p className="text-sm text-muted-foreground"></p>
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    <div className="w-48 h-4 bg-gray-400 rounded animate-pulse"></div>
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <div className="w-48 h-4 bg-gray-400 rounded animate-pulse"></div>

                    <span>•</span>
                    <span>
                      <div className="w-48 h-4 bg-gray-400 rounded animate-pulse"></div>
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div className="w-48 h-4 bg-gray-400 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Droplets className="h-4 w-4 mr-2" />
                    Группа крови
                  </div>

                  <div className="w-48 h-4 bg-gray-400 rounded animate-pulse"></div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Ruler className="h-4 w-4 mr-2" />
                    Рост / Вес
                  </div>
                  <div className="space-y-1">
                    <div className="w-48 h-4 bg-gray-400 rounded animate-pulse"></div>
                    <div className="w-48 h-4 bg-gray-400 rounded animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Экстренный контакт
                  </div>
                  <div className="space-y-1">
                    <div className="w-48 h-4 bg-gray-400 rounded animate-pulse"></div>
                    <div className="w-48 h-4 bg-gray-400 rounded animate-pulse"></div>
                    <div className="w-48 h-4 bg-gray-400 rounded animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Дата рождения
                  </div>
                  <div className="w-48 h-4 bg-gray-400 rounded animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Allergies */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-base">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />
                  Аллергии
                </CardTitle>
              </CardHeader>
              <CardContent className="flex space-x-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-20 h-4 bg-gray-400 rounded animate-pulse"
                  ></div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-base">
                  <Heart className="h-4 w-4 mr-2 text-red-600" />
                  Хронические заболевания
                </CardTitle>
              </CardHeader>
              <CardContent className="flex space-x-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-20 h-4 bg-gray-400 rounded animate-pulse"
                  ></div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-base">
                  <Pill className="h-4 w-4 mr-2 text-blue-600" />
                  Текущие препараты
                </CardTitle>
              </CardHeader>
              <CardContent className="flex space-x-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-20 h-4 bg-gray-400 rounded animate-pulse"
                  ></div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="text-md text-gray-500">
          Error occured, please refresh the page
        </h1>
      </div>
    );
  }

  const {
    doctor,
    doctor_id,
    id,
    notes,
    patient,
    medical_card,
    patient_id,
    scheduled_at,
    status,
  } = appointment!;

  const parsedDOB = parse(patient.dob, "dd/MM/yyyy", new Date());

  const getBMI = (height: number, weight: number) => {
    const heightInM = height / 100;
    const bmi = weight / (heightInM * heightInM);
    return bmi.toFixed(1);
  };

  const bmi = getBMI(medical_card.height_cm, medical_card.weight_kg);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex gap-x-4 items-center">
            <div className="p-2 hover:bg-gray-200 hover:cursor-pointer transition rounded">
              <ArrowLeft size={32} onClick={() => router.back()} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Информация о приёме
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Детали приёма и медицинская карта пациента
              </p>
            </div>
          </div>
          <Badge variant="outline" className={getStatusColor(status)}>
            {appLoading ? (
              <div className="w-10 h-4 animate-pulse"></div>
            ) : (
              getStatusText(status)
            )}
          </Badge>
        </div>

        {/* Appointment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Детали приёма
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  Дата и время
                </div>
                <div className="space-y-1">
                  <p className="font-medium">
                    {format(scheduled_at, "PPPP", { locale: ru })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(scheduled_at, "HH:mm")} (30 мин)
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Stethoscope className="h-4 w-4 mr-2" />
                  Врач
                </div>
                <div className="space-y-1">
                  <p className="font-medium">{doctor.full_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {getSpecialization(doctor.specialization)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  Местоположение
                </div>
                <div className="space-y-1">
                  <p className="font-medium">
                    Местоположение доктора, Ташкент, Узбекистан
                  </p>
                  <p className="text-sm text-muted-foreground">Кардиология</p>
                </div>
              </div>
            </div>

            {notes ? (
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Примечания
                </h4>
                <p className="text-sm text-muted-foreground">{notes}</p>
              </div>
            ) : (
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Примечания
                </h4>
                <p className="text-sm text-muted-foreground">Примечаний нет</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Patient Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <User className="h-5 w-5 mr-2 text-green-600" />
              Информация о пациенте
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4 mb-6">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-blue-100 text-blue-700 text-lg font-medium">
                  {getInitials(patient.full_name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {patient.full_name}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                  <span>{calculateAge(parsedDOB)} лет</span>
                  <span>•</span>
                  <span>
                    {patient.gender === "Male" ? "Мужской" : "Женский"}
                  </span>
                  <span>•</span>
                  <span>ID: {patient.id}</span>
                </div>
                <div className="flex items-center mt-2">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{patient.phone}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Droplets className="h-4 w-4 mr-2" />
                  Группа крови
                </div>
                <Badge
                  variant="outline"
                  className="bg-red-50 text-red-700 border-red-200"
                >
                  {medical_card.blood_type}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Ruler className="h-4 w-4 mr-2" />
                  Рост / Вес
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {medical_card.height_cm} см / {medical_card.weight_kg} кг
                  </p>
                  <p className="text-xs text-muted-foreground">ИМТ: {bmi}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Экстренный контакт
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {medical_card.emergency_contact.name}
                  </p>
                  <p className="text-sm font-medium">
                    {medical_card.emergency_contact.phone}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {getRelation(medical_card.emergency_contact.relation)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  Дата рождения
                </div>
                <p className="text-sm font-medium">
                  {format(parsedDOB, "dd-MM-yyyy")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Allergies */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base">
                <AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />
                Аллергии
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {medical_card.allergies.length > 0 ? (
                medical_card.allergies.map((allergy: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-amber-50 text-amber-700 border-amber-200 mr-1"
                  >
                    {allergy}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Нет аллергий</p>
              )}
            </CardContent>
          </Card>

          {/* Chronic Conditions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base">
                <Heart className="h-4 w-4 mr-2 text-red-600" />
                Хронические заболевания
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {medical_card.chronic_conditions.length > 0 ? (
                medical_card.chronic_conditions.map(
                  (condition: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200 mr-1"
                    >
                      {condition}
                    </Badge>
                  )
                )
              ) : (
                <p className="text-sm text-muted-foreground">
                  Нет хронических заболеваний
                </p>
              )}
            </CardContent>
          </Card>

          {/* Medications */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base">
                <Pill className="h-4 w-4 mr-2 text-blue-600" />
                Текущие препараты
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {medical_card.medications.length > 0 ? (
                medical_card.medications.map(
                  (medication: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      {medication}
                    </Badge>
                  )
                )
              ) : (
                <p className="text-sm text-muted-foreground">
                  Нет текущих препаратов
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
