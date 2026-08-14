"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarIcon, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cities } from "@/lib/data/cities";

const EVENT_OPTIONS = [
  { value: "weddings", label: "Wedding" },
  { value: "birthdays", label: "Birthday" },
  { value: "corporate-meetings", label: "Corporate Event" },
  { value: "college-cultural-events", label: "College Event" },
  { value: "family-functions", label: "Family Event" },
  { value: "private-parties", label: "Private Party" },
];

export function SearchBar() {
  const router = useRouter();
  const [eventType, setEventType] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [guests, setGuests] = useState<string>("");

  function handleSearch() {
    const params = new URLSearchParams();
    if (eventType) params.set("eventType", eventType);
    if (city) params.set("city", city);
    if (date) params.set("date", date);
    if (guests) params.set("guests", guests);
    router.push(`/services?${params.toString()}`);
  }

  return (
    <div className="w-full rounded-2xl border border-border bg-white p-3 shadow-lg shadow-charcoal/5 sm:p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:items-end lg:gap-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">Event</label>
          <Select value={eventType} onValueChange={setEventType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select event" />
            </SelectTrigger>
            <SelectContent>
              {EVENT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">Location</label>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">Date</label>
          <div className="relative">
            <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">Guests</label>
          <div className="relative">
            <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="number"
              min={1}
              placeholder="e.g. 150"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Button
          onClick={handleSearch}
          className="h-10 w-full bg-rose text-white hover:bg-burgundy lg:h-9"
        >
          <Search className="h-4 w-4" />
          Find Services
        </Button>
      </div>
    </div>
  );
}
