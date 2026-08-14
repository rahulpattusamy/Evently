"use client";

import Image from "next/image";
import { FileCheck2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { VerifiedBadge, PremiumBadge } from "@/components/shared/verified-badge";
import { getVendorById } from "@/lib/data/vendors";
import { toast } from "sonner";

const DOCUMENTS = ["GST Certificate.pdf", "Business License.pdf", "PAN Card.pdf"];

export default function VendorProfilePage() {
  const vendor = getVendorById("vendor-1")!;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-charcoal">Business Profile</h1>
        <Button
          className="bg-rose text-white hover:bg-burgundy"
          onClick={() => toast.success("Profile updated")}
        >
          Save Changes
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-white">
        <div className="relative h-40 w-full">
          <Image src={vendor.coverImage} alt={vendor.businessName} fill className="object-cover" />
        </div>
        <div className="flex items-center gap-4 px-5 pb-5 -mt-10">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-4 border-white">
            <Image src={vendor.logoImage} alt={vendor.businessName} fill className="object-cover" />
          </div>
          <div className="pt-10">
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-lg font-bold text-charcoal">{vendor.businessName}</h2>
              {vendor.verified && <VerifiedBadge />}
              {vendor.premium && <PremiumBadge />}
            </div>
            <p className="text-sm text-muted-foreground">{vendor.tagline}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 rounded-2xl border border-border bg-white p-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Business Name</Label>
          <Input defaultValue={vendor.businessName} />
        </div>
        <div className="space-y-1.5">
          <Label>Owner Name</Label>
          <Input defaultValue={vendor.ownerName} />
        </div>
        <div className="space-y-1.5">
          <Label>Category</Label>
          <Input defaultValue={vendor.categorySlug.replace(/-/g, " ")} className="capitalize" />
        </div>
        <div className="space-y-1.5">
          <Label>Address</Label>
          <Input defaultValue={vendor.address} />
        </div>
        <div className="space-y-1.5">
          <Label>Years in Business</Label>
          <Input defaultValue={vendor.yearsInBusiness} type="number" />
        </div>
        <div className="space-y-1.5">
          <Label>Typical Response Time</Label>
          <Input defaultValue={vendor.responseTime} />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Tagline</Label>
          <Input defaultValue={vendor.tagline} />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Description</Label>
          <Textarea defaultValue={vendor.description} rows={4} />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-bold text-charcoal">Business Documents</h2>
          {vendor.verified ? (
            <span className="text-sm font-medium text-rose">Verified Vendor</span>
          ) : (
            <span className="text-sm font-medium text-muted-foreground">Pending Verification</span>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {DOCUMENTS.map((doc) => (
            <span
              key={doc}
              className="flex items-center gap-1.5 rounded-full border border-border bg-blush/30 px-3 py-1.5 text-xs font-medium text-charcoal"
            >
              <FileCheck2 className="h-3.5 w-3.5 text-emerald-600" />
              {doc}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
