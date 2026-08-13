"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarCheck } from "lucide-react";

export function VendorAvailability() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={{ before: new Date() }}
        className="rounded-xl border border-border"
      />
      <div className="flex-1 rounded-xl border border-border bg-blush/40 p-4">
        <div className="flex items-center gap-2 text-burgundy">
          <CalendarCheck className="h-5 w-5" />
          <span className="text-sm font-semibold">
            {date ? date.toDateString() : "Select a date"}
          </span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {date
            ? "This vendor appears to be available on this date. Request a quote to confirm final availability and pricing."
            : "Pick a date on the calendar to check estimated availability."}
        </p>
      </div>
    </div>
  );
}
