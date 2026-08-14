"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User as UserIcon, Mail, Phone, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthShowcase } from "@/components/auth/auth-showcase";
import { AuthModeTabs } from "@/components/auth/mode-tabs";
import { PasswordInput } from "@/components/auth/password-input";
import { RoleToggle, type AuthRole } from "@/components/auth/role-toggle";
import { Logo } from "@/components/shared/logo";

const schema = z
  .object({
    name: z.string().min(2, "Enter your full name"),
    phone: z.string().min(10, "Enter a valid 10-digit phone number").max(15),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((v) => v === true, {
      message: "You must accept the Terms & Privacy Policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

const PASSWORD_HINTS = [
  { test: (v: string) => v.length >= 6, label: "6+ characters" },
  { test: (v: string) => /[0-9]/.test(v), label: "a number" },
  { test: (v: string) => /[A-Z]/.test(v), label: "an uppercase letter" },
];

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState<AuthRole>(
    searchParams.get("role") === "vendor" ? "vendor" : "customer"
  );
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const password = watch("password") ?? "";

  function onSubmit() {
    return new Promise((resolve) => {
      setTimeout(() => {
        toast.success(
          role === "vendor"
            ? "Vendor account created — let's set up your business profile."
            : "Account created — welcome to Evently!"
        );
        router.push(role === "vendor" ? "/vendor/dashboard" : "/dashboard");
        resolve(true);
      }, 800);
    });
  }

  return (
    <div className="grid min-h-screen lg:h-screen lg:grid-cols-2 lg:overflow-hidden">
      <AuthShowcase />

      <div className="scrollbar-hide relative flex items-center justify-center overflow-y-auto px-4 py-10 sm:px-8">
        <a href="/" className="absolute left-4 top-4 sm:left-8 sm:top-8 lg:hidden">
          <Logo className="h-14" variant="glow" />
        </a>
        <div className="w-full max-w-sm animate-auth-fade-up">
          <AuthModeTabs />

          <div className="mt-7">
            <h1 className="font-heading text-2xl font-bold text-charcoal">Create your account</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Join thousands planning better events on Evently.
            </p>
          </div>

          <div className="mt-6 space-y-1.5">
            <Label className="text-xs font-semibold text-charcoal">I&apos;m signing up as</Label>
            <RoleToggle value={role} onChange={setRole} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <div className="relative">
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="name" placeholder="Your name" className="h-11 rounded-xl pl-9" {...register("name")} />
              </div>
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="phone" placeholder="10-digit number" className="h-11 rounded-xl pl-9" {...register("phone")} />
                </div>
                {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@example.com" className="h-11 rounded-xl pl-9" {...register("email")} />
                </div>
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <PasswordInput id="password" placeholder="••••••••" {...register("password")} />
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
              {password.length > 0 && (
                <div className="flex flex-wrap gap-x-3 gap-y-1 pt-0.5">
                  {PASSWORD_HINTS.map((hint) => {
                    const ok = hint.test(password);
                    return (
                      <span
                        key={hint.label}
                        className={`flex items-center gap-1 text-[11px] ${ok ? "text-emerald-600" : "text-muted-foreground"}`}
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        {hint.label}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <PasswordInput id="confirmPassword" placeholder="••••••••" {...register("confirmPassword")} />
              {errors.confirmPassword && (
                <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-start gap-2">
              <Checkbox id="terms" onCheckedChange={(v) => setValue("terms", v === true)} />
              <label htmlFor="terms" className="text-xs leading-relaxed text-muted-foreground">
                I agree to Evently&apos;s{" "}
                <span className="font-medium text-charcoal">Terms of Service</span> and{" "}
                <span className="font-medium text-charcoal">Privacy Policy</span>.
              </label>
            </div>
            {errors.terms && <p className="text-xs text-destructive">{errors.terms.message}</p>}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="group h-11 w-full rounded-xl bg-rose text-white hover:bg-burgundy"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {role === "vendor" ? "Create Vendor Account" : "Create Account"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-7 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/login" className="font-semibold text-rose hover:text-burgundy">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
