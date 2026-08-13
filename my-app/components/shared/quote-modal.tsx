"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eventTypes } from "@/lib/data/event-types";

const quoteSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(10, "Enter a valid 10-digit phone number").max(15),
  email: z.string().email("Enter a valid email address"),
  eventType: z.string().min(1, "Please select an event type"),
  eventDate: z.string().min(1, "Please select an event date"),
  location: z.string().min(2, "Please enter a location"),
  guests: z.string().min(1, "Please enter guest count"),
  budget: z.string().min(1, "Please enter your budget"),
  requirements: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetName: string;
}

export function QuoteModal({ open, onOpenChange, targetName }: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
  });

  function onSubmit() {
    return new Promise((resolve) => {
      setTimeout(() => {
        setSubmitted(true);
        resolve(true);
      }, 600);
    });
  }

  function handleClose(next: boolean) {
    onOpenChange(next);
    if (!next) {
      setTimeout(() => {
        setSubmitted(false);
        reset();
      }, 200);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-rose" />
            <DialogTitle className="text-xl">
              Your request has been sent successfully.
            </DialogTitle>
            <DialogDescription>
              {targetName} will get back to you shortly with a quote.
            </DialogDescription>
            <Button
              className="mt-2 bg-rose text-white hover:bg-burgundy"
              onClick={() => handleClose(false)}
            >
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Request a Quote</DialogTitle>
              <DialogDescription>
                Tell {targetName} about your event and get a custom quote.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
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

              <div className="grid grid-cols-2 gap-3">
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
                <div className="space-y-1.5">
                  <Label htmlFor="eventDate">Event Date</Label>
                  <Input id="eventDate" type="date" {...register("eventDate")} />
                  {errors.eventDate && <p className="text-xs text-destructive">{errors.eventDate.message}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="location">Location</Label>
                <Input id="location" {...register("location")} placeholder="City / area" />
                {errors.location && <p className="text-xs text-destructive">{errors.location.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="guests">Guests</Label>
                  <Input id="guests" type="number" {...register("guests")} placeholder="e.g. 150" />
                  {errors.guests && <p className="text-xs text-destructive">{errors.guests.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="budget">Budget (₹)</Label>
                  <Input id="budget" {...register("budget")} placeholder="e.g. 1,00,000" />
                  {errors.budget && <p className="text-xs text-destructive">{errors.budget.message}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="requirements">Additional Requirements</Label>
                <Textarea
                  id="requirements"
                  {...register("requirements")}
                  placeholder="Tell us more about your event..."
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-rose text-white hover:bg-burgundy"
              >
                {isSubmitting ? "Sending..." : "Send Request"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
