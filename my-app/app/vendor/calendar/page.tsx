"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";

type DayStatus = "available" | "booked" | "blocked";

export default function VendorCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [statuses, setStatuses] = useState<Record<string, DayStatus>>({});

  const key = date?.toDateString();
  const currentStatus = key ? statuses[key] ?? "available" : undefined;

  function setStatus(s: DayStatus) {
    if (!key) return;
    setStatuses((prev) => ({ ...prev, [key]: s }));
  }

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-charcoal">Availability Calendar</h1>

      <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-white p-5 sm:flex-row">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={{ before: new Date() }}
          modifiers={{
            booked: Object.entries(statuses).filter(([, v]) => v === "booked").map(([d]) => new Date(d)),
            blocked: Object.entries(statuses).filter(([, v]) => v === "blocked").map(([d]) => new Date(d)),
          }}
          modifiersClassNames={{
            booked: "bg-rose text-white",
            blocked: "bg-muted text-muted-foreground line-through",
          }}
          className="rounded-xl border border-border"
        />
        <div className="flex-1 rounded-xl border border-border bg-blush/30 p-4">
          <div className="flex items-center gap-2 text-burgundy">
            <CalendarCheck className="h-5 w-5" />
            <span className="text-sm font-semibold">
              {date ? date.toDateString() : "Select a date to manage"}
            </span>
          </div>
          {date && (
            <>
              <p className="mt-2 text-sm text-muted-foreground">
                Current status: <span className="font-medium text-charcoal capitalize">{currentStatus}</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm" variant={currentStatus === "available" ? "default" : "outline"} className={currentStatus === "available" ? "bg-rose text-white hover:bg-burgundy" : ""} onClick={() => setStatus("available")}>
                  Available
                </Button>
                <Button size="sm" variant={currentStatus === "booked" ? "default" : "outline"} className={currentStatus === "booked" ? "bg-rose text-white hover:bg-burgundy" : ""} onClick={() => setStatus("booked")}>
                  Booked
                </Button>
                <Button size="sm" variant={currentStatus === "blocked" ? "default" : "outline"} className={currentStatus === "blocked" ? "bg-rose text-white hover:bg-burgundy" : ""} onClick={() => setStatus("blocked")}>
                  Blocked
                </Button>
              </div>
            </>
          )}
          <div className="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-white border border-border" /> Available</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-rose" /> Booked</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-muted" /> Blocked</span>
          </div>
        </div>
      </div>
    </div>
  );
}
