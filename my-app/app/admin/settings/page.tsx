"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const SETTINGS = [
  { key: "autoVerify", label: "Auto-verify vendors with 4.5+ rating and 50+ reviews", checked: false },
  { key: "emailAlerts", label: "Email alerts for new vendor verification requests", checked: true },
  { key: "payoutHold", label: "Hold vendor payouts until event completion", checked: true },
  { key: "publicReviews", label: "Allow reviews to be published without moderation", checked: false },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(SETTINGS);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-charcoal">Settings</h1>
        <p className="text-sm text-muted-foreground">Platform-wide configuration.</p>
      </div>

      <div className="divide-y divide-border rounded-2xl border border-border bg-white">
        {settings.map((s) => (
          <label key={s.key} className="flex items-center gap-3 px-5 py-4">
            <Checkbox
              checked={s.checked}
              onCheckedChange={(v) =>
                setSettings((prev) => prev.map((row) => (row.key === s.key ? { ...row, checked: !!v } : row)))
              }
            />
            <span className="text-sm text-charcoal">{s.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
