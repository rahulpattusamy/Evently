"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const ROWS = [
  { key: "quotes", label: "Quote request updates", description: "Get notified when a vendor responds to your quote request." },
  { key: "bookings", label: "Booking reminders", description: "Reminders about upcoming payments and event dates." },
  { key: "offers", label: "Offers & recommendations", description: "Curated venue and vendor suggestions for your events." },
  { key: "sms", label: "SMS notifications", description: "Receive important updates via SMS as well as email." },
];

export default function DashboardSettingsPage() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    quotes: true,
    bookings: true,
    offers: false,
    sms: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-charcoal">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage how Evently keeps you updated.</p>
      </div>

      <div className="divide-y divide-border rounded-2xl border border-border bg-white">
        {ROWS.map((row) => (
          <div key={row.key} className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="text-sm font-semibold text-charcoal">{row.label}</p>
              <p className="text-xs text-muted-foreground">{row.description}</p>
            </div>
            <Checkbox
              checked={prefs[row.key]}
              onCheckedChange={(v) => {
                setPrefs((p) => ({ ...p, [row.key]: !!v }));
                toast.success(`${row.label} ${v ? "enabled" : "disabled"}`);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
