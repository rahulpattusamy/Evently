import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { vendors } from "@/lib/data/vendors";
import { DataTable, DataTableColumn } from "@/components/dashboard/data-table";
import { ServiceCategory } from "@/lib/types";

const columns: DataTableColumn<ServiceCategory>[] = [
  { key: "name", header: "Service", render: (c) => <span className="font-medium text-charcoal">{c.name}</span> },
  { key: "group", header: "Group", render: (c) => c.group },
  { key: "description", header: "Description", render: (c) => <span className="text-muted-foreground">{c.description}</span> },
  {
    key: "vendors",
    header: "Vendors",
    render: (c) => vendors.filter((v) => v.categorySlug === c.slug).length,
  },
  {
    key: "actions",
    header: "",
    render: (c) => (
      <Link href={`/services/${c.slug}`} className="text-xs font-medium text-rose hover:text-burgundy">
        View →
      </Link>
    ),
  },
];

export default function AdminServicesPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-heading text-2xl font-bold text-charcoal">Services</h1>
        <p className="text-sm text-muted-foreground">{categories.length} service categories offered on the platform.</p>
      </div>
      <DataTable columns={columns} data={categories} rowKey={(c) => c.slug} emptyTitle="No categories yet" />
    </div>
  );
}
