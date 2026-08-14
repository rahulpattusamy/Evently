"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatINR } from "@/components/shared/price-display";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetId: string;
  targetName: string;
  packageName: string;
  price: number;
}

export function BookingModal({
  open,
  onOpenChange,
  targetId,
  targetName,
  packageName,
  price,
}: BookingModalProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState("");
  const [step, setStep] = useState<"details" | "done">("details");

  function handleClose(next: boolean) {
    onOpenChange(next);
    if (!next) {
      setTimeout(() => {
        setStep("details");
        setDate(undefined);
        setGuests("");
      }, 200);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[85vh] max-w-md overflow-y-auto">
        {step === "done" ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-rose" />
            <DialogTitle className="text-xl">Booking request placed</DialogTitle>
            <DialogDescription>
              We&apos;ve held {packageName} with {targetName} for you. Continue to
              review details and pay to confirm your slot.
            </DialogDescription>
            <div className="mt-2 flex w-full gap-2">
              <Button variant="outline" className="flex-1" onClick={() => handleClose(false)}>
                Close
              </Button>
              <Button asChild className="flex-1 bg-rose text-white hover:bg-burgundy">
                <Link href={`/booking/${targetId}`}>Continue to Book</Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Book {targetName}</DialogTitle>
              <DialogDescription>
                {packageName} · Starting from ₹{formatINR(price)}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Select a date</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={{ before: new Date() }}
                  className="rounded-xl border border-border"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="guests">Guest count</Label>
                <Input
                  id="guests"
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  placeholder="e.g. 150"
                />
              </div>
              <Button
                className="w-full bg-rose text-white hover:bg-burgundy"
                disabled={!date || !guests}
                onClick={() => setStep("done")}
              >
                Hold This Slot
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
