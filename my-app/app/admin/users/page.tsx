import Image from "next/image";
import { DataTable, DataTableColumn } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { users } from "@/lib/data/users";
import { cities } from "@/lib/data/cities";
import { User } from "@/lib/types";

function cityName(slug: string) {
  return cities.find((c) => c.slug === slug)?.name ?? slug;
}

const columns: DataTableColumn<User>[] = [
  {
    key: "name",
    header: "User",
    render: (u) => (
      <div className="flex items-center gap-3">
        <Image src={u.avatar} alt={u.name} width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
        <span className="font-medium text-charcoal">{u.name}</span>
      </div>
    ),
  },
  { key: "email", header: "Email", render: (u) => <span className="text-muted-foreground">{u.email}</span> },
  { key: "phone", header: "Phone", render: (u) => <span className="text-muted-foreground">{u.phone}</span> },
  { key: "city", header: "City", render: (u) => cityName(u.city) },
  { key: "joined", header: "Joined", render: (u) => new Date(u.joinedDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) },
  { key: "role", header: "Role", render: (u) => <StatusBadge status={u.role === "customer" ? "confirmed" : u.role === "vendor" ? "quoted" : "verified"} /> },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-heading text-2xl font-bold text-charcoal">Customers</h1>
        <p className="text-sm text-muted-foreground">{users.length} registered users across the platform.</p>
      </div>
      <DataTable columns={columns} data={users} rowKey={(u) => u.id} emptyTitle="No users yet" />
    </div>
  );
}
