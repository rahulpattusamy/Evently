"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { currentUser } from "@/lib/data/users";
import { getCityBySlug } from "@/lib/data/cities";

export default function DashboardProfilePage() {
  const city = getCityBySlug(currentUser.city);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-charcoal">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your personal information.</p>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6">
        <div className="mb-6 flex items-center gap-4">
          <div
            className="h-16 w-16 shrink-0 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          />
          <div>
            <p className="font-heading text-lg font-bold text-charcoal">{currentUser.name}</p>
            <p className="text-sm text-muted-foreground">
              Member since {new Date(currentUser.joinedDate).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
            </p>
          </div>
        </div>

        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Profile updated");
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue={currentUser.name} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={currentUser.email} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" defaultValue={currentUser.phone} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="city">City</Label>
            <Input id="city" defaultValue={city?.name} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" className="bg-rose text-white hover:bg-burgundy">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
