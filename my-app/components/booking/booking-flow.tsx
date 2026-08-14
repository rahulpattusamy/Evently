"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, CheckCircle2, CreditCard, Landmark, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatINR } from "@/components/shared/price-display";
import { eventTypes } from "@/lib/data/event-types";
import { cn } from "@/lib/utils";

export interface BookingTarget {
  id: string;
  name: string;
  image: string;
  isVenue: boolean;
  startingPrice: number;
  packages: { name: string; price: number; features: string[] }[];
}

const STEPS = ["Service", "Date", "Time", "Event Details", "Review", "Payment", "Confirmation"];

const TIME_SLOTS = ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00"];

const detailsSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(10, "Enter a valid 10-digit phone number").max(15),
  email: z.string().email("Enter a valid email address"),
  guests: z.string().min(1, "Please enter guest count"),
  eventType: z.string().min(1, "Please select an event type"),
});

type DetailsValues = z.infer<typeof detailsSchema>;

function refNumber(id: string) {
  const hash = Array.from(id).reduce((a, c) => a + c.charCodeAt(0), 0);
  return `EVS-${(100000 + (hash * 37) % 899999).toString().padStart(6, "0")}`;
}

export function BookingFlow({ target }: { target: BookingTarget }) {
  const [step, setStep] = useState(0);
  const [pkgIndex, setPkgIndex] = useState(0);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [details, setDetails] = useState<DetailsValues | null>(null);
  const [payMethod, setPayMethod] = useState<"upi" | "card" | "netbanking">("upi");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DetailsValues>({ resolver: zodResolver(detailsSchema) });

  const pkg = target.packages[pkgIndex];
  const gst = Math.round(pkg.price * 0.18);
  const total = pkg.price + gst;
  const advance = Math.round(total * 0.2);
  const balance = total - advance;
  const reference = useMemo(() => refNumber(target.id + (date?.toISOString() ?? "")), [target.id, date]);

  const canProceed = [
    true,
    !!date,
    !!time,
    !!details,
    true,
    true,
    true,
  ][step];

  function next() {
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  }

  return (
    <div className="mt-8">
      <div className="mb-8 flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center">
            <div
              className={cn(
                "flex h-7 shrink-0 items-center gap-1.5 rounded-full px-3 text-xs font-semibold",
                i < step
                  ? "bg-rose text-white"
                  : i === step
                    ? "border-2 border-rose text-rose"
                    : "border border-border text-muted-foreground"
              )}
            >
              {i < step ? <Check className="h-3 w-3" /> : i + 1} {label}
            </div>
            {i < STEPS.length - 1 && <div className="mx-1 h-px w-4 shrink-0 bg-border" />}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-white p-5 sm:p-8">
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="font-heading text-lg font-bold text-charcoal">Choose a package</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {target.packages.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setPkgIndex(i)}
                  className={cn(
                    "rounded-xl border p-4 text-left transition-colors",
                    i === pkgIndex ? "border-rose bg-blush/40" : "border-border hover:border-rose/50"
                  )}
                >
                  <p className="font-heading font-bold text-charcoal">{p.name}</p>
                  <p className="mt-1 text-lg font-bold text-rose">₹{formatINR(p.price)}</p>
                  <ul className="mt-2 space-y-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <Check className="mt-0.5 h-3 w-3 shrink-0 text-rose" /> {f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-heading text-lg font-bold text-charcoal">Pick a date</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={{ before: new Date() }}
              className="rounded-xl border border-border"
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-heading text-lg font-bold text-charcoal">Pick a time slot</h2>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={cn(
                    "rounded-xl border px-4 py-2 text-sm font-medium",
                    t === time
                      ? "border-rose bg-rose text-white"
                      : "border-border text-charcoal hover:border-rose/50"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <form
            className="space-y-4"
            onSubmit={handleSubmit((values) => {
              setDetails(values);
              next();
            })}
          >
            <h2 className="font-heading text-lg font-bold text-charcoal">Event details</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} placeholder="Your name" />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...register("phone")} placeholder="10-digit number" />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} placeholder="you@example.com" />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="guests">Guests</Label>
                <Input id="guests" type="number" {...register("guests")} placeholder="e.g. 150" />
                {errors.guests && <p className="text-xs text-destructive">{errors.guests.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label>Event Type</Label>
                <Select onValueChange={(v) => setValue("eventType", v)} value={watch("eventType")}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((e) => (
                      <SelectItem key={e.slug} value={e.slug}>{e.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.eventType && <p className="text-xs text-destructive">{errors.eventType.message}</p>}
              </div>
            </div>
            <Button type="submit" className="bg-rose text-white hover:bg-burgundy">
              Continue
            </Button>
          </form>
        )}

        {step === 4 && details && (
          <div className="space-y-4">
            <h2 className="font-heading text-lg font-bold text-charcoal">Review your booking</h2>
            <div className="flex items-center gap-3 rounded-xl border border-border p-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                <Image src={target.image} alt={target.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-heading font-bold text-charcoal">{target.name}</p>
                <p className="text-xs text-muted-foreground">{pkg.name} package</p>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-y-2 text-sm">
              <dt className="text-muted-foreground">Date</dt>
              <dd className="text-right text-charcoal">{date?.toDateString()}</dd>
              <dt className="text-muted-foreground">Time</dt>
              <dd className="text-right text-charcoal">{time}</dd>
              <dt className="text-muted-foreground">Guests</dt>
              <dd className="text-right text-charcoal">{details.guests}</dd>
              <dt className="text-muted-foreground">Contact</dt>
              <dd className="text-right text-charcoal">{details.name} · {details.phone}</dd>
            </dl>
            <div className="space-y-1.5 rounded-xl bg-blush/40 p-4 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{formatINR(pkg.price)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>GST (18%)</span><span>₹{formatINR(gst)}</span></div>
              <div className="flex justify-between border-t border-rose/20 pt-1.5 font-bold text-charcoal"><span>Total</span><span>₹{formatINR(total)}</span></div>
              <div className="flex justify-between text-burgundy"><span>Advance payable now (20%)</span><span>₹{formatINR(advance)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Balance due later</span><span>₹{formatINR(balance)}</span></div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className="font-heading text-lg font-bold text-charcoal">Payment</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { id: "upi", label: "UPI", icon: Smartphone },
                { id: "card", label: "Card", icon: CreditCard },
                { id: "netbanking", label: "Netbanking", icon: Landmark },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPayMethod(m.id as typeof payMethod)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border p-4",
                    payMethod === m.id ? "border-rose bg-blush/40" : "border-border hover:border-rose/50"
                  )}
                >
                  <m.icon className="h-5 w-5 text-rose" />
                  <span className="text-sm font-medium text-charcoal">{m.label}</span>
                </button>
              ))}
            </div>
            <Button className="w-full bg-rose text-white hover:bg-burgundy sm:w-auto" onClick={next}>
              Pay ₹{formatINR(advance)} Now
            </Button>
          </div>
        )}

        {step === 6 && (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 className="h-14 w-14 text-rose" />
            <h2 className="font-heading text-xl font-bold text-charcoal">Booking Confirmed!</h2>
            <p className="text-sm text-muted-foreground">
              Reference <span className="font-semibold text-charcoal">{reference}</span>
            </p>
            <div className="mt-2 w-full max-w-sm space-y-1.5 rounded-xl bg-blush/40 p-4 text-left text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Booked</span><span className="text-charcoal">{target.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="text-charcoal">{date?.toDateString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Paid now</span><span className="text-charcoal">₹{formatINR(advance)}</span></div>
            </div>
            <Button asChild className="mt-3 bg-rose text-white hover:bg-burgundy">
              <Link href="/dashboard/bookings">Go to Dashboard</Link>
            </Button>
          </div>
        )}

        {step < 6 && step !== 3 && step !== 5 && (
          <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
            <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
            <Button disabled={!canProceed} className="bg-rose text-white hover:bg-burgundy" onClick={next}>
              {step === 4 ? "Continue to Payment" : "Continue"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
