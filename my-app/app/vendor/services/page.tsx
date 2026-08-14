"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatINR } from "@/components/shared/price-display";
import { getVendorById } from "@/lib/data/vendors";
import { toast } from "sonner";

export default function VendorServicesPage() {
  const vendor = getVendorById("vendor-1")!;
  const [services, setServices] = useState(vendor.services);
  const [newService, setNewService] = useState("");
  const [packages, setPackages] = useState(vendor.packages);

  function addService() {
    if (!newService.trim()) return;
    setServices((s) => [...s, newService.trim()]);
    setNewService("");
  }

  function removeService(name: string) {
    setServices((s) => s.filter((x) => x !== name));
  }

  function removeFeature(pkgIndex: number, feature: string) {
    setPackages((pkgs) =>
      pkgs.map((p, i) => (i === pkgIndex ? { ...p, features: p.features.filter((f) => f !== feature) } : p))
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-charcoal">Services & Packages</h1>
        <Button className="bg-rose text-white hover:bg-burgundy" onClick={() => toast.success("Changes saved")}>
          Save Changes
        </Button>
      </div>

      <div className="rounded-2xl border border-border bg-white p-5">
        <h2 className="font-heading text-base font-bold text-charcoal">Services Offered</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {services.map((s) => (
            <span
              key={s}
              className="flex items-center gap-1.5 rounded-full bg-blush px-3 py-1.5 text-xs font-medium text-burgundy"
            >
              {s}
              <button onClick={() => removeService(s)} aria-label={`Remove ${s}`}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Input
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            placeholder="Add a new service"
            className="max-w-xs"
          />
          <Button variant="outline" className="gap-1.5" onClick={addService}>
            <Plus className="h-4 w-4" /> Add
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {packages.map((pkg, pkgIndex) => (
          <div key={pkg.name} className="flex flex-col rounded-2xl border border-border bg-white p-5">
            <Label className="text-xs text-muted-foreground">Package Name</Label>
            <Input defaultValue={pkg.name} className="mt-1 font-heading font-bold" />
            <Label className="mt-3 text-xs text-muted-foreground">Price (₹)</Label>
            <Input defaultValue={pkg.price} type="number" className="mt-1" />
            <p className="mt-1 text-xs text-muted-foreground">₹{formatINR(pkg.price)}</p>
            <div className="mt-3 flex-1 space-y-1.5">
              {pkg.features.map((f) => (
                <div key={f} className="flex items-center justify-between gap-2 rounded-lg border border-border px-2.5 py-1.5 text-xs text-charcoal">
                  {f}
                  <button onClick={() => removeFeature(pkgIndex, f)} aria-label={`Remove ${f}`}>
                    <X className="h-3 w-3 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="mt-2 gap-1 text-rose hover:text-burgundy">
              <Plus className="h-3.5 w-3.5" /> Add Feature
            </Button>
          </div>
        ))}
        <button
          className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border text-sm font-medium text-muted-foreground hover:border-rose hover:text-rose"
          onClick={() => toast("Package builder coming soon")}
        >
          <Plus className="h-5 w-5" /> Add Package
        </button>
      </div>
    </div>
  );
}
