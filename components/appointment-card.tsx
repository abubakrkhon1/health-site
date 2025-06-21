// components/AppointmentCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClockIcon, UserIcon, PhoneIcon, FileTextIcon } from "lucide-react";
import { format } from "date-fns";
import { AppointmentCardProps } from "@/types/types";

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  const { client, doctor, scheduled_at, status, notes } = appointment;

  return (
    <Card className="w-full hover:shadow-lg transition">
      <CardHeader>
        <CardTitle className="text-lg">
          {client.full_name}{" "}
          <span className="text-sm font-normal text-gray-500">({client.gender})</span>
        </CardTitle>
        <div className="text-xs text-muted-foreground">
          ID: {appointment.id}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <PhoneIcon className="h-4 w-4 text-muted-foreground" />
          <span>{client.phone}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <ClockIcon className="h-4 w-4 text-muted-foreground" />
          <span>{format(new Date(scheduled_at), "dd MMMM yyyy, HH:mm")}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <UserIcon className="h-4 w-4 text-muted-foreground" />
          <span>Doctor: {doctor.full_name}</span>
        </div>

        {notes && (
          <div className="flex items-start gap-2 text-sm">
            <FileTextIcon className="h-4 w-4 text-muted-foreground mt-1" />
            <p className="text-muted-foreground">{notes}</p>
          </div>
        )}

        <div className="text-xs mt-2 inline-block rounded-full px-2 py-1 bg-yellow-100 text-yellow-800 font-medium capitalize">
          {status}
        </div>
      </CardContent>
    </Card>
  );
}
