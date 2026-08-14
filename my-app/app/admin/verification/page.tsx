"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { FileText, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { vendors } from "@/lib/data/vendors";
import { cities } from "@/lib/data/cities";

function cityName(slug: string) {
  return cities.find((c) => c.slug === slug)?.name ?? slug;
}

const DOCS = ["GST Certificate", "PAN Card", "Business License"];

const initial = vendors
  .filter((v) => !v.verified)
  .concat(vendors.filter((v) => v.verified).slice(0, 2))
  .map((v) => ({
    vendor: v,
    status: v.verified ? "verified" : "pending",
    submitted: `2026-0${(v.yearsInBusiness % 6) + 1}-1${(v.reviewCount % 9) + 1}`,
  }));

export default function AdminVerificationPage() {
  const [rows, setRows] = useState(initial);

  function updateStatus(id: string, status: string, message: string) {
    setRows((prev) => prev.map((r) => (r.vendor.id === id ? { ...r, status } : r)));
    toast.success(message);
  }

  if (rows.length === 0) {
    return <EmptyState title="No verification requests" description="All vendors are reviewed." />;
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-heading text-2xl font-bold text-charcoal">Vendor Verification</h1>
        <p className="text-sm text-muted-foreground">
          {rows.filter((r) => r.status === "pending").length} vendors awaiting review.
        </p>
      </div>

      <div className="space-y-3">
        {rows.map(({ vendor, status, submitted }) => (
          <div key={vendor.id} className="rounded-2xl border border-border bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Image
                  src={vendor.logoImage}
                  alt={vendor.businessName}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-xl object-cover"
                />
                <div>
                  <p className="font-heading font-semibold text-charcoal">{vendor.businessName}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {vendor.categorySlug.replace(/-/g, " ")}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {cityName(vendor.citySlug)} · Submitted{" "}
                    {new Date(submitted).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </p>
                </div>
              </div>
              <StatusBadge status={status} />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {DOCS.map((doc) => (
                <span
                  key={doc}
                  className="flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-charcoal"
                >
                  <FileText className="h-3.5 w-3.5 text-muted-foreground" /> {doc}
                </span>
              ))}
            </div>

            {status === "pending" && (
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  className="bg-rose text-white hover:bg-burgundy"
                  onClick={() => updateStatus(vendor.id, "verified", `${vendor.businessName} approved.`)}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    updateStatus(vendor.id, "rejected", `${vendor.businessName} rejected.`)
                  }
                >
                  Reject
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toast.info(`Information requested from ${vendor.businessName}.`)}
                >
                  Request Information
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
