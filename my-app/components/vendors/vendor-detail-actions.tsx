"use client";

import { useState } from "react";
import { Heart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuoteModal } from "@/components/shared/quote-modal";
import { cn } from "@/lib/utils";

export function VendorDetailActions({ vendorName, openInitially }: { vendorName: string; openInitially?: boolean }) {
  const [open, setOpen] = useState(!!openInitially);
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        className="gap-1.5"
        onClick={() => setSaved((s) => !s)}
      >
        <Heart className={cn("h-4 w-4", saved ? "fill-rose text-rose" : "")} />
        {saved ? "Saved" : "Save"}
      </Button>
      <Button variant="outline" className="gap-1.5">
        <Phone className="h-4 w-4" /> Contact
      </Button>
      <Button className="flex-1 bg-rose text-white hover:bg-burgundy sm:flex-none" onClick={() => setOpen(true)}>
        Request Quote
      </Button>
      <QuoteModal open={open} onOpenChange={setOpen} targetName={vendorName} />
    </div>
  );
}
