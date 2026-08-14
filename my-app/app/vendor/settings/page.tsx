"use client";

import { useState } from "react";
import { Bell, Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const TOGGLES = [
  { key: "inquiries", label: "New inquiry notifications", desc: "Get notified when a customer sends a request", icon: Bell },
  { key: "email", label: "Email summaries", desc: "Weekly performance summary in your inbox", icon: Mail },
  { key: "messages", label: "Message alerts", desc: "SMS alert for urgent customer messages", icon: MessageSquare },
  { key: "twofactor", label: "Two-factor authentication", desc: "Add an extra layer of security to your account", icon: ShieldCheck },
];

export default function VendorSettingsPage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({ inquiries: true, email: true, messages: false, twofactor: false });

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-charcoal">Settings</h1>
      <div className="divide-y divide-border rounded-2xl border border-border bg-white">
        {TOGGLES.map((t) => (
          <div key={t.key} className="flex items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blush text-rose">
                <t.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-charcoal">{t.label}</p>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </div>
            </div>
            <button
              onClick={() => setEnabled((e) => ({ ...e, [t.key]: !e[t.key] }))}
              className={cn(
                "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                enabled[t.key] ? "bg-rose" : "bg-muted"
              )}
              aria-pressed={enabled[t.key]}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
                  enabled[t.key] ? "translate-x-5.5 left-0.5" : "left-0.5"
                )}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
