"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Check,
  Zap,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { formatINR } from "@/components/shared/price-display";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface GrowClientProps {
  vendor: {
    id: string;
    businessName: string;
    coverImage: string;
    startingPrice: number;
    rating: number;
    reviewCount: number;
    citySlug: string;
    categorySlug: string;
  };
}

export function GrowClient({ vendor }: GrowClientProps) {
  // Billing cycle toggle
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");
  
  // Checkout Modal State
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Ad Bidding State
  const [adSpend, setAdSpend] = useState<number>(5000);
  const [cpcBid, setCpcBid] = useState<number>(35);
  const [isAdActive, setIsAdActive] = useState(false);

  // ROI Calculator State
  const [avgBookingValue, setAvgBookingValue] = useState<number>(vendor.startingPrice * 2);
  const [conversionRate, setConversionRate] = useState<number>(5); // in percentage

  // 1. Subscription Plans
  const plans = [
    {
      name: "Starter (Current)",
      price: 0,
      description: "Basic features for growing vendors",
      features: [
        "10% marketplace commission",
        "Standard search placement",
        "Up to 3 active service listings",
        "Basic lead details",
        "Standard response window (24h)",
      ],
      cta: "Current Plan",
      premium: false,
      disabled: true,
    },
    {
      name: "Pro Merchant",
      price: billingCycle === "monthly" ? 2499 : 1999,
      description: "Boost bookings and build customer trust",
      features: [
        "5% marketplace commission",
        "Priority search placement",
        "Unlimited active service listings",
        "Verified Partner Badge",
        "Direct chat with clients",
        "Analytics dashboard access",
      ],
      cta: "Upgrade to Pro",
      premium: true,
      disabled: false,
    },
    {
      name: "Elite Partner",
      price: billingCycle === "monthly" ? 5999 : 4799,
      description: "Max visibility and dedicated growth tools",
      features: [
        "0% marketplace commission",
        "Featured/Top search placement",
        "Auto-response custom templates",
        "Verified Partner Badge",
        "Dedicated Account Manager",
        "SMS & Whatsapp lead notifications",
        "Unlimited response quotes",
      ],
      cta: "Upgrade to Elite",
      premium: true,
      disabled: false,
    },
  ];

  // 2. Ad Bidding Calculations
  const projectedDailyClicks = useMemo(() => {
    return Math.round((adSpend / 30) / cpcBid);
  }, [adSpend, cpcBid]);

  const projectedMonthlyInquiries = useMemo(() => {
    // estimated 15% inquiry conversion rate from clicks
    return Math.round(projectedDailyClicks * 30 * 0.15);
  }, [projectedDailyClicks]);

  // 3. ROI Calculator Calculations
  const roiData = useMemo(() => {
    const totalInquiries = projectedMonthlyInquiries;
    const totalBookings = Math.round(totalInquiries * (conversionRate / 100));
    const projectedRevenue = totalBookings * avgBookingValue;
    const netReturn = Math.max(0, projectedRevenue - adSpend);

    return {
      totalBookings,
      projectedRevenue,
      netReturn,
      chart: [
        { name: "Current Spend", Spend: 0, Revenue: 0 },
        { name: "Ad Campaign", Spend: adSpend, Revenue: projectedRevenue },
      ],
    };
  }, [projectedMonthlyInquiries, conversionRate, avgBookingValue, adSpend]);

  function handleCheckout(planName: string) {
    setSelectedPlan(planName);
    setIsCheckingOut(true);
  }

  function confirmUpgrade() {
    setIsCheckingOut(false);
    toast.success(`Successfully upgraded to ${selectedPlan}! Welcome to Evently Premium.`);
    setSelectedPlan(null);
  }

  function handleAdToggle() {
    if (!isAdActive) {
      setIsAdActive(true);
      toast.success("Sponsored Listing Campaign launched successfully!");
    } else {
      setIsAdActive(false);
      toast.error("Sponsored Listing Campaign paused.");
    }
  }

  return (
    <div className="space-y-10">
      {/* 1. Header Hero section */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-r from-rose/10 via-blush/40 to-gold/5 p-6 sm:p-10">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose/15 px-3 py-1 text-xs font-semibold text-rose">
            <Sparkles className="h-3 w-3" /> Evently Vendor Growth
          </span>
          <h1 className="mt-4 font-heading text-3xl font-extrabold text-charcoal sm:text-4xl">
            Grow your business. <br />
            <span className="bg-gradient-to-r from-rose to-burgundy bg-clip-text text-transparent">Get 5x more bookings.</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Upgrade your plan to boost visibility, lower your commission fees, and access state-of-the-art tools to convert clicks into high-value bookings.
          </p>
        </div>
      </div>

      {/* 2. Subscription Tiers Section */}
      <div className="space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-heading text-xl font-bold text-charcoal sm:text-2xl">Upgrade Your Package</h2>
            <p className="text-sm text-muted-foreground">Select a plan that suits your monthly event capacity.</p>
          </div>
          <div className="inline-flex rounded-full border border-border bg-white p-1 shadow-sm">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                billingCycle === "monthly" ? "bg-rose text-white" : "text-charcoal hover:text-rose"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annually")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                billingCycle === "annually" ? "bg-rose text-white" : "text-charcoal hover:text-rose"
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-3xl border bg-white p-6 shadow-sm transition-all hover:shadow-md ${
                p.premium ? "border-rose/50 ring-1 ring-rose/10" : "border-border"
              }`}
            >
              {p.name.includes("Pro") && (
                <span className="absolute -top-3 left-6 rounded-full bg-rose px-3 py-0.5 text-[10px] font-extrabold text-white uppercase tracking-wider">
                  Popular
                </span>
              )}
              {p.name.includes("Elite") && (
                <span className="absolute -top-3 left-6 rounded-full bg-burgundy px-3 py-0.5 text-[10px] font-extrabold text-white uppercase tracking-wider">
                  Best Value
                </span>
              )}
              <div className="flex-1">
                <h3 className="font-heading text-lg font-bold text-charcoal">{p.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{p.description}</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-extrabold text-charcoal">
                    ₹{formatINR(p.price)}
                  </span>
                  <span className="ml-1 text-xs text-muted-foreground">/ month</span>
                </div>
                {billingCycle === "annually" && p.price > 0 && (
                  <p className="mt-1 text-[11px] font-semibold text-emerald-600">
                    Billed annually (₹{formatINR(p.price * 12)})
                  </p>
                )}

                <ul className="mt-6 space-y-3 border-t border-border pt-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4">
                <Button
                  onClick={() => !p.disabled && handleCheckout(p.name)}
                  disabled={p.disabled}
                  className={`w-full h-10 rounded-xl font-semibold transition-all ${
                    p.disabled
                      ? "bg-slate-100 text-muted-foreground cursor-not-allowed"
                      : "bg-rose text-white hover:bg-burgundy"
                  }`}
                >
                  {p.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Bidding & ROI Simulator Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sponsored Bidding Simulator */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm space-y-6">
          <div>
            <h2 className="font-heading text-lg font-bold text-charcoal">Sponsored Ads Bidding Simulator</h2>
            <p className="text-xs text-muted-foreground">Bid for top search spots. Pay only when clients click your card.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-charcoal">
                <span>Monthly Ads Budget</span>
                <span className="text-rose">₹{formatINR(adSpend)} / month</span>
              </div>
              <Slider
                value={[adSpend]}
                min={1000}
                max={25000}
                step={500}
                onValueChange={(val) => setAdSpend(val[0])}
                className="py-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-charcoal">
                <span>Cost-Per-Click (CPC) Bid</span>
                <span className="text-rose">₹{cpcBid} / click</span>
              </div>
              <Slider
                value={[cpcBid]}
                min={15}
                max={150}
                step={5}
                onValueChange={(val) => setCpcBid(val[0])}
                className="py-2"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-warm-white p-4 border border-border grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Projected Monthly Clicks</p>
              <p className="mt-1 font-heading text-lg font-bold text-charcoal">
                {projectedDailyClicks * 30}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Est. Clicks Per Day</p>
              <p className="mt-1 font-heading text-lg font-bold text-rose">
                {projectedDailyClicks}
              </p>
            </div>
          </div>

          {/* Ad Live Preview */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-charcoal">Marketplace Sponsored Card Preview</p>
            <div className="relative overflow-hidden rounded-2xl border-2 border-rose/30 bg-white p-3 shadow-md flex gap-4">
              <span className="absolute right-3 top-3 z-10 rounded bg-rose px-1.5 py-0.5 text-[9px] font-bold text-white uppercase tracking-wide flex items-center gap-1 shadow-sm">
                <Zap className="h-2 w-2 fill-current animate-pulse" /> Sponsored
              </span>
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                <Image src={vendor.coverImage} alt={vendor.businessName} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-between py-0.5">
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-rose">
                    <ShieldCheck className="h-3 w-3 fill-current" /> Verified
                  </div>
                  <h4 className="line-clamp-1 font-heading text-sm font-bold text-charcoal mt-0.5">
                    {vendor.businessName}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5 capitalize">
                    {vendor.categorySlug.replace("-", " ")} · {vendor.citySlug}
                  </p>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-[10px] text-muted-foreground">
                    From <strong className="text-xs text-rose font-bold">₹{formatINR(vendor.startingPrice)}</strong>
                  </span>
                  <span className="text-xs font-bold text-charcoal flex items-center gap-0.5">
                    ⭐ {vendor.rating.toFixed(1)} <span className="text-[10px] font-normal text-muted-foreground">({vendor.reviewCount})</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={handleAdToggle}
            className={`w-full h-11 rounded-xl font-bold transition-all ${
              isAdActive ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-rose text-white hover:bg-burgundy"
            }`}
          >
            {isAdActive ? "Pause Sponsored Campaign" : "Launch Sponsored Campaign"}
          </Button>
        </div>

        {/* ROI Projection Calculator */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm space-y-6">
          <div>
            <h2 className="font-heading text-lg font-bold text-charcoal">ROI Revenue Calculator</h2>
            <p className="text-xs text-muted-foreground">Interact with settings to calculate return-on-ad-spend (ROAS).</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-charcoal">Avg. Booking Value (₹)</Label>
              <Input
                type="number"
                value={avgBookingValue}
                onChange={(e) => setAvgBookingValue(Number(e.target.value))}
                className="h-10 rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-charcoal">Conversion Rate (%)</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="h-10 rounded-xl w-20"
                />
                <span className="text-xs text-muted-foreground">of inquiries booked</span>
              </div>
            </div>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roiData.chart} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip formatter={(value) => `₹${formatINR(Number(value))}`} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="Spend" fill="#E11D48" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Revenue" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center rounded-2xl bg-rose/5 border border-rose/10 p-4">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase">Projected Bookings</p>
              <p className="mt-1 font-heading text-lg font-bold text-charcoal">{roiData.totalBookings}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase">Est. Revenue</p>
              <p className="mt-1 font-heading text-lg font-bold text-emerald-600">₹{formatINR(roiData.projectedRevenue)}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase">Net Profit</p>
              <p className="mt-1 font-heading text-lg font-bold text-rose">₹{formatINR(roiData.netReturn)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckingOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-border bg-white p-6 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose/10 text-rose">
                <Zap className="h-6 w-6" />
              </span>
              <h3 className="font-heading text-xl font-bold text-charcoal">Confirm Upgrade</h3>
              <p className="text-xs text-muted-foreground">You are upgrading your subscription on Evently.</p>
            </div>

            <div className="rounded-2xl border border-border bg-warm-white p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-charcoal">{selectedPlan}</span>
                <span className="font-bold text-rose">
                  ₹{formatINR(plans.find((p) => p.name === selectedPlan)?.price ?? 0)}/mo
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Your card on file will be charged automatically at the start of each billing cycle. You can cancel or change your plan at any time inside Settings.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsCheckingOut(false)}
                className="flex-1 h-11 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmUpgrade}
                className="flex-1 h-11 rounded-xl bg-rose text-white hover:bg-burgundy font-bold"
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
