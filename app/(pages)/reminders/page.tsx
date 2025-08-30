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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Bell,
  Calendar,
  Clock,
  Edit,
  Trash2,
  CheckCircle,
} from "lucide-react";

export default function NotesRemindersSection() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Повторный приём с Иваном Петровым",
      content: "Проверить эффективность лекарств от давления",
      patient: "Иван Петров",
      priority: "высокий",
      dueDate: "2024-01-20",
      dueTime: "09:00",
      isReminder: true,
      completed: false,
      category: "повторный-приём",
    },
    {
      id: 2,
      title: "Просмотр результатов анализов",
      content: "Результаты анализов крови Марии Сидоровой должны быть готовы",
      patient: "Мария Сидорова",
      priority: "средний",
      dueDate: "2024-01-18",
      dueTime: "14:00",
      isReminder: true,
      completed: false,
      category: "анализы",
    },
    {
      id: 3,
      title: "Звонок Алексею Козлову",
      content: "Обсудить перенос приёма",
      patient: "Алексей Козлов",
      priority: "низкий",
      dueDate: "2024-01-25",
      dueTime: "10:00",
      isReminder: true,
      completed: true,
      category: "приём",
    },
  ]);

  const [newNoteDialog, setNewNoteDialog] = useState(false);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "высокий":
        return <Badge variant="destructive">Высокий</Badge>;
      case "средний":
        return <Badge>Средний</Badge>;
      case "низкий":
        return <Badge variant="secondary">Низкий</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const toggleComplete = (id: number) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };

  const upcomingReminders = notes.filter(
    (note) =>
      note.isReminder && !note.completed && new Date(note.dueDate) >= new Date()
  );

  return (
    <div className="px-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight dark:text-white/90">Заметки и напоминания</h1>
          <p className="text-muted-foreground dark:text-white/40">Управление заметками и настройка напоминаний для важных задач</p>
        </div>
        <Dialog open={newNoteDialog} onOpenChange={setNewNoteDialog}>
          <DialogTrigger asChild>
            <Button className="dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"> <Plus className="h-4 w-4 mr-2" /> Добавить заметку/напоминание </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl dark:bg-slate-900/80 backdrop-blur-sm border-none">
            <DialogHeader>
              <DialogTitle>Добавить новую заметку/напоминание</DialogTitle>
              <DialogDescription>
                Создать новую заметку или настроить напоминание для важных
                задач.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Заголовок
                </Label>
                <Input id="title" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="patient" className="text-right">
                  Пациент
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Выберите пациента (необязательно)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ivan-petrov">Иван Петров</SelectItem>
                    <SelectItem value="maria-sidorova">
                      Мария Сидорова
                    </SelectItem>
                    <SelectItem value="alexey-kozlov">
                      Алексей Козлов
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Категория
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="повторный-приём">
                      Повторный приём
                    </SelectItem>
                    <SelectItem value="анализы">Анализы</SelectItem>
                    <SelectItem value="приём">Приём</SelectItem>
                    <SelectItem value="общее">Общее</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Приоритет
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Выберите приоритет" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="высокий">Высокий</SelectItem>
                    <SelectItem value="средний">Средний</SelectItem>
                    <SelectItem value="низкий">Низкий</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Содержание
                </Label>
                <Textarea id="content" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isReminder" className="text-right">
                  Установить напоминание
                </Label>
                <Switch id="isReminder" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right">
                  Дата выполнения
                </Label>
                <Input id="dueDate" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueTime" className="text-right">
                  Время выполнения
                </Label>
                <Input id="dueTime" type="time" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Сохранить заметку/напоминание</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="dark:bg-slate-900 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white/90">Всего заметок</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground dark:text-white/40" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white/90">{notes.length}</div>
          </CardContent>
        </Card>
        <Card className="dark:bg-slate-900 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Активные напоминания
            </CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingReminders.length}</div>
          </CardContent>
        </Card>
        <Card className="dark:bg-slate-900 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Высокий приоритет
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                notes.filter((n) => n.priority === "высокий" && !n.completed)
                  .length
              }
            </div>
          </CardContent>
        </Card>
        <Card className="dark:bg-slate-900 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Выполненные</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notes.filter((n) => n.completed).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Reminders */}
        <Card className="dark:bg-slate-900 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="dark:text-white/90">Предстоящие напоминания</CardTitle>
            <CardDescription className="dark:text-white/40">Задачи, требующие вашего внимания</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingReminders.slice(0, 5).map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-start justify-between p-3 border dark:border-slate-800 rounded-lg dark:bg-slate-800/60"
                >
                  <div className="flex items-start space-x-3">
                    <Bell className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{reminder.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {reminder.patient}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {reminder.dueDate} в {reminder.dueTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getPriorityBadge(reminder.priority)}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleComplete(reminder.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Notes */}
        <Card className="dark:bg-slate-900 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="dark:text-white/90">Последние заметки</CardTitle>
            <CardDescription className="dark:text-white/40">Ваши последние заметки и наблюдения</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notes.slice(0, 5).map((note) => (
                <div
                  key={note.id}
                  className="flex items-start justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{note.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {note.content}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {note.patient}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getPriorityBadge(note.priority)}
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Notes Table */}
      <Card className="dark:bg-slate-900 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="dark:text-white/90">Все заметки и напоминания</CardTitle>
          <CardDescription className="dark:text-white/40">Полный список ваших заметок и напоминаний</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`flex items-center justify-between p-4 border rounded-lg dark:border-slate-800 dark:bg-slate-800/60 ${
                  note.completed ? "opacity-50" : ""
                }`}
              >
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleComplete(note.id)}
                    className={note.completed ? "bg-green-50" : ""}
                  >
                    <CheckCircle
                      className={`h-4 w-4 ${
                        note.completed ? "text-green-600" : ""
                      }`}
                    />
                  </Button>
                  <div>
                    <p
                      className={`font-medium ${
                        note.completed ? "line-through" : ""
                      }`}
                    >
                      {note.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {note.content}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {note.category}
                      </Badge>
                      {note.patient && (
                        <span className="text-xs text-muted-foreground">
                          • {note.patient}
                        </span>
                      )}
                      {note.isReminder && (
                        <span className="text-xs text-muted-foreground">
                          • {note.dueDate} {note.dueTime}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getPriorityBadge(note.priority)}
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
