"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { formatINR } from "@/components/shared/price-display";
import { getVendorById } from "@/lib/data/vendors";
import { getQuotesForVendor } from "@/lib/data/quote-requests";
import { QuoteRequest } from "@/lib/types";
import { toast } from "sonner";

function titleFor(q: QuoteRequest) {
  const label = q.eventType
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return `${label} Request`;
}

export default function VendorInquiriesPage() {
  const vendor = getVendorById("vendor-1")!;
  const [quotes, setQuotes] = useState(getQuotesForVendor(vendor.id));
  const [quoting, setQuoting] = useState<QuoteRequest | null>(null);
  const [amount, setAmount] = useState("");

  function sendQuote() {
    if (!quoting) return;
    setQuotes((qs) =>
      qs.map((q) => (q.id === quoting.id ? { ...q, status: "quoted", quotedAmount: Number(amount) } : q))
    );
    toast.success(`Quote sent to ${quoting.userName}`);
    setQuoting(null);
    setAmount("");
  }

  function decline(id: string) {
    setQuotes((qs) => qs.map((q) => (q.id === id ? { ...q, status: "declined" } : q)));
    toast("Request declined");
  }

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-charcoal">Inquiries</h1>

      {quotes.length === 0 ? (
        <EmptyState title="No inquiries yet" description="New customer requests will show up here." />
      ) : (
        <div className="space-y-3">
          {quotes.map((q) => (
            <div key={q.id} className="rounded-2xl border border-border bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-heading text-base font-bold text-charcoal">{titleFor(q)}</h3>
                  <p className="text-sm text-muted-foreground">Customer: {q.userName}</p>
                </div>
                <StatusBadge status={q.status} />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                <div>
                  <p className="text-xs text-muted-foreground">Event Date</p>
                  <p className="font-medium text-charcoal">{q.eventDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Guests</p>
                  <p className="font-medium text-charcoal">{q.guests}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Budget</p>
                  <p className="font-medium text-charcoal">₹{formatINR(q.budget)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Services</p>
                  <p className="truncate font-medium text-charcoal">{q.requiredServices.join(", ")}</p>
                </div>
              </div>
              {q.requirements && (
                <p className="mt-3 rounded-lg bg-blush/30 p-3 text-sm text-charcoal">{q.requirements}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => toast(`Viewing request from ${q.userName}`)}>
                  View Request
                </Button>
                {q.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      className="bg-rose text-white hover:bg-burgundy"
                      onClick={() => {
                        setQuoting(q);
                        setAmount(String(q.budget));
                      }}
                    >
                      Send Quote
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => decline(q.id)}>
                      Decline
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!quoting} onOpenChange={(o) => !o && setQuoting(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Send a Quote</DialogTitle>
            <DialogDescription>{quoting?.userName} · {quoting && titleFor(quoting)}</DialogDescription>
          </DialogHeader>
          <div className="space-y-1.5">
            <Label htmlFor="amount">Quoted Amount (₹)</Label>
            <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <Button className="w-full bg-rose text-white hover:bg-burgundy" onClick={sendQuote}>
            Send
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
