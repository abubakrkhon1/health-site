// components/AppointmentCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Phone, Calendar, User2 } from "lucide-react";
import { format } from "date-fns";
import { AppointmentCardProps } from "@/types/types";

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  const { client, doctor, scheduled_at, status, notes } = appointment;

  const getStatusVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "default";
      case "waiting":
        return "secondary";
      case "completed":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="group cursor-pointer transition-all duration-200 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 border-gray-200 dark:border-gray-700">
      <CardContent className="p-3 sm:p-4">
        {/* Mobile-first layout: stack everything vertically on small screens */}
        <div className="space-y-3">
          {/* Top row: Avatar, Name, and Status */}
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1 min-w-0">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-gray-100 dark:ring-gray-800 flex-shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-medium">
                  {getInitials(client.full_name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base truncate">
                      {client.full_name}
                    </h3>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {client.gender}
                    </span>
                  </div>
                  
                  {/* Status badge - moved to top right for mobile */}
                  <Badge 
                    variant="outline" 
                    className={`text-xs font-medium capitalize px-2 py-1 ml-2 flex-shrink-0 ${getStatusColor(status)}`}
                  >
                    {status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Second row: Date and Time - full width on mobile */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4 mr-1.5 flex-shrink-0" />
                <span className="font-medium">
                  {format(new Date(scheduled_at), "dd MMM yyyy")}
                </span>
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-1.5 flex-shrink-0" />
                <span className="font-medium">
                  {format(new Date(scheduled_at), "HH:mm")}
                </span>
              </div>
            </div>
          </div>

          {/* Third row: Contact info */}
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Phone className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span className="truncate">{client.phone}</span>
          </div>

          {/* Notes - if present */}
          {notes && (
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                {notes}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}