"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Eye, FileText, Clock, Calendar } from "lucide-react";

// Add this type above your component
interface AppointmentRecord {
  id: number;
  patientName: string;
  date: string;
  time: string;
  type: string;
  diagnosis: string;
  prescription: string;
  notes: string;
  nextAppointment: string;
  status: string;
}

export default function MedicalRecordsPage() {
  // Explicitly type your state
  const [appointments] = useState<AppointmentRecord[]>([
    {
      id: 1,
      patientName: "Иван Петров",
      date: "2024-01-20",
      time: "09:00",
      type: "Консультация",
      diagnosis: "Гипертония",
      prescription: "Лозартан 50мг",
      notes: "Контроль давления через неделю",
      nextAppointment: "2024-01-27",
      status: "завершён"
    },
    {
      id: 2,
      patientName: "Мария Сидорова",
      date: "2024-01-15",
      time: "10:30",
      type: "Повторный приём",
      diagnosis: "Артериальная гипертензия",
      prescription: "Амлодипин 5мг",
      notes: "Давление стабилизировалось",
      nextAppointment: "2024-02-15",
      status: "завершён"
    },
    {
      id: 3,
      patientName: "Алексей Козлов",
      date: "2024-01-18",
      time: "11:15",
      type: "Осмотр",
      diagnosis: "Сахарный диабет 2 типа",
      prescription: "Метформин 1000мг",
      notes: "Необходим контроль гликированного гемоглобина",
      nextAppointment: "2024-02-01",
      status: "завершён"
    }
  ]);

  // Type selectedRecord as AppointmentRecord or null
  const [selectedRecord, setSelectedRecord] = useState<AppointmentRecord | null>(null);
  const [viewRecordDialog, setViewRecordDialog] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "завершён":
        return <Badge variant="default">Завершён</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const recentAppointments = appointments.filter(
    (apt) => new Date(apt.date) >= new Date("2024-01-15")
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight dark:text-white/90">Медицинские записи</h1>
          <p className="text-muted-foreground dark:text-white/40">История приёмов и результаты обследований</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white/90">Всего записей</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground dark:text-white/40" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white/90">{appointments.length}</div>
          </CardContent>
        </Card>
        <Card className="dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white/90">Недавние приёмы</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground dark:text-white/40" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white/90">{recentAppointments.length}</div>
          </CardContent>
        </Card>
        <Card className="dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white/90">Предстоящие приёмы</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground dark:text-white/40" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white/90">
              {appointments.filter(apt => new Date(apt.nextAppointment) > new Date()).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medical Records Table */}
      <Card className="dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="dark:text-white/90">История приёмов</CardTitle>
          <CardDescription className="dark:text-white/40">Полная история приёмов и результатов обследований</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="dark:text-white/60">Пациент</TableHead>
                <TableHead className="dark:text-white/60">Дата</TableHead>
                <TableHead className="dark:text-white/60">Время</TableHead>
                <TableHead className="dark:text-white/60">Тип</TableHead>
                <TableHead className="dark:text-white/60">Диагноз</TableHead>
                <TableHead className="dark:text-white/60">Статус</TableHead>
                <TableHead className="dark:text-white/60">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((record: AppointmentRecord) => (
                <TableRow key={record.id} className="dark:hover:bg-slate-800">
                  <TableCell className="font-medium dark:text-white/90">{record.patientName}</TableCell>
                  <TableCell className="dark:text-white/70">{record.date}</TableCell>
                  <TableCell className="dark:text-white/70">{record.time}</TableCell>
                  <TableCell className="dark:text-white/70">{record.type}</TableCell>
                  <TableCell className="dark:text-white/70">{record.diagnosis}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell>
                    <Dialog open={viewRecordDialog} onOpenChange={setViewRecordDialog}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedRecord(record)}
                          className="dark:hover:bg-slate-700"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="dark:bg-slate-900/80 backdrop-blur-sm border-none">
                        <DialogHeader>
                          <DialogTitle className="dark:text-white/90">Детали приёма</DialogTitle>
                          <DialogDescription className="dark:text-white/40">
                            {selectedRecord?.patientName} - {selectedRecord?.date}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium dark:text-white/90">Диагноз</h4>
                            <p className="text-sm dark:text-white/70">{selectedRecord?.diagnosis}</p>
                          </div>
                          <div>
                            <h4 className="font-medium dark:text-white/90">Назначения</h4>
                            <p className="text-sm dark:text-white/70">{selectedRecord?.prescription}</p>
                          </div>
                          <div>
                            <h4 className="font-medium dark:text-white/90">Примечания</h4>
                            <p className="text-sm dark:text-white/70">{selectedRecord?.notes}</p>
                          </div>
                          <div>
                            <h4 className="font-medium dark:text-white/90">Следующий приём</h4>
                            <p className="text-sm dark:text-white/70">{selectedRecord?.nextAppointment}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
