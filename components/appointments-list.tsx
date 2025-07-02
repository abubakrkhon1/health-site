"use client";
import { Card, CardContent } from "./ui/card";
import { Appointment } from "@/types/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import AppointmentCard from "./appointment-card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AppointmentsList({
  appointments,
  appLoading,
}: {
  appointments: any[];
  appLoading: boolean;
}) {
  const router = useRouter();
  return (
    <div className="space-y-3">
      {appLoading ? (
        // Beautiful skeleton cards
        Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {/* Avatar skeleton */}
                  <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />

                  <div className="flex-1 space-y-2">
                    {/* Name skeleton */}
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-32" />

                    {/* Details skeleton */}
                    <div className="space-y-1">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-28" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {/* Status badge skeleton */}
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse w-16" />
                  {/* Date skeleton */}
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-12" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : appointments.length > 0 ? (
        appointments.map((appt: Appointment, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div>
                <AppointmentCard appointment={appt} />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                      {appt.client.full_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span>Appointment Details</span>
                </DialogTitle>
                <DialogDescription>
                  Complete information for {appt.client.full_name}'s appointment
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Patient
                    </label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {appt.client.full_name}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Phone
                    </label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {appt.client.phone}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Date & Time
                    </label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {format(
                        new Date(appt.scheduled_at),
                        "dd MMMM yyyy, HH:mm"
                      )}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Status
                    </label>
                    <Badge
                      variant="outline"
                      className="w-fit capitalize ml-2 bg-gradient-to-br from-orange-300 to-orange-600 text-white"
                    >
                      {appt.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Doctor
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {appt.doctor.full_name}
                  </p>
                </div>

                {appt.notes && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Notes
                    </label>
                    <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      {appt.notes}
                    </p>
                  </div>
                )}
              </div>

              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className="border-2"
                  >
                    Close
                  </Button>
                </DialogClose>
                <Button
                  onClick={() => router.push(`/appointments/${appt.id}`)}
                  type="button"
                  variant="default"
                  className="transition hover:bg-indigo-700 bg-indigo-600 mb-2 md:mb-0"
                >
                  Go to this appointment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))
      ) : (
        // Beautiful empty state
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <Calendar className="h-full w-full" />
          </div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
            No appointments today
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your schedule is clear for today
          </p>
        </div>
      )}
    </div>
  );
}
