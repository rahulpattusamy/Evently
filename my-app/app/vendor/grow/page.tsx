import { getVendorById } from "@/lib/data/vendors";
import { GrowClient } from "@/components/vendor/grow-client";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Grow Business | Evently",
};

export default function VendorGrowPage() {
  const vendor = getVendorById("vendor-1");
  if (!vendor) notFound();

  return (
    <div className="space-y-6">
      <GrowClient vendor={vendor} />
    </div>
  );
}
