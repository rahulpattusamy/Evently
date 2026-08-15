"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User as UserIcon, Mail, Phone, Lock, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthShowcase } from "@/components/auth/auth-showcase";
import { AuthModeTabs } from "@/components/auth/mode-tabs";
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
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password") ?? "";

  function onSubmit() {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", role);
        toast.success(
          role === "vendor"
            ? "Vendor account created — let's set up your business profile."
            : "Account created — welcome to Evently!"
        );
        router.push(role === "vendor" ? "/vendor/dashboard" : "/");
        resolve(true);
      }, 800);
    });
  }

  return (
    <div className="grid min-h-screen lg:h-screen lg:grid-cols-2 lg:overflow-hidden">
      <AuthShowcase />

      <div className="scrollbar-hide relative flex items-center justify-center overflow-y-auto px-4 py-10 sm:px-8">
        <Link href="/" className="absolute left-4 top-4 sm:left-8 sm:top-8 lg:hidden">
          <Logo className="h-14" variant="glow" />
        </Link>
        <div className="w-full max-w-sm animate-auth-fade-up">
          <AuthModeTabs />

          <div className="mt-7">
            <h1 className="font-heading text-2xl font-bold text-charcoal">Create your account</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Join thousands planning better events on Evently.
            </p>
          </div>

          {/* Step Progress Indicator */}
          <div className="mt-6">
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-rose transition-all duration-300"
                style={{ width: `${((step + 1) / 5) * 100}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-1.5">
              <span className="text-[10px] font-bold text-rose uppercase tracking-wider">
                Step {step + 1} of 5
              </span>
              <span className="text-[10px] text-muted-foreground font-semibold">
                {step === 0 && "Choose Role"}
                {step === 1 && "Personal Info"}
                {step === 2 && "Contact Details"}
                {step === 3 && "Security"}
                {step === 4 && "Terms Agreement"}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
            {step === 0 && (
              <div className="space-y-4 animate-auth-fade-up">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-charcoal">I&apos;m signing up as</Label>
                  <RoleToggle value={role} onChange={setRole} />
                </div>
                <Button
                  type="button"
                  className="w-full h-11 rounded-xl bg-rose text-white font-bold hover:bg-burgundy flex items-center justify-center gap-1.5"
                  onClick={() => setStep(1)}
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4 animate-auth-fade-up">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full name</Label>
                  <div className="relative">
                    <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="name" placeholder="Your name" className="h-11 rounded-xl pl-9" {...register("name")} />
                  </div>
                  {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" className="flex-1 h-11 rounded-xl" onClick={() => setStep(0)}>
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 h-11 rounded-xl bg-rose text-white font-bold hover:bg-burgundy"
                    onClick={async () => {
                      const ok = await trigger("name");
                      if (ok) setStep(2);
                    }}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-auth-fade-up">
                <div className="space-y-3">
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
                <div className="flex gap-3">
                  <Button type="button" variant="outline" className="flex-1 h-11 rounded-xl" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 h-11 rounded-xl bg-rose text-white font-bold hover:bg-burgundy"
                    onClick={async () => {
                      const ok = await trigger(["phone", "email"]);
                      if (ok) setStep(3);
                    }}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-auth-fade-up">
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-11 rounded-xl pl-9"
                        {...register("password")}
                      />
                    </div>
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
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-11 rounded-xl pl-9"
                        {...register("confirmPassword")}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="showPassword"
                      checked={showPassword}
                      onCheckedChange={(v) => setShowPassword(v === true)}
                    />
                    <label htmlFor="showPassword" className="text-xs text-muted-foreground cursor-pointer">
                      Show password
                    </label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" className="flex-1 h-11 rounded-xl" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 h-11 rounded-xl bg-rose text-white font-bold hover:bg-burgundy"
                    onClick={async () => {
                      const ok = await trigger(["password", "confirmPassword"]);
                      if (ok) setStep(4);
                    }}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 animate-auth-fade-up">
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2 rounded-xl border border-border p-3 bg-slate-50/50">
                    <Checkbox id="terms" onCheckedChange={(v) => setValue("terms", v === true)} />
                    <label htmlFor="terms" className="text-xs leading-relaxed text-muted-foreground">
                      I agree to Evently&apos;s{" "}
                      <span className="font-semibold text-charcoal">Terms of Service</span> and{" "}
                      <span className="font-semibold text-charcoal">Privacy Policy</span>.
                    </label>
                  </div>
                  {errors.terms && <p className="text-xs text-destructive">{errors.terms.message}</p>}
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" className="flex-1 h-11 rounded-xl" onClick={() => setStep(3)}>
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 group h-11 rounded-xl bg-rose text-white hover:bg-burgundy font-bold flex items-center justify-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        {role === "vendor" ? "Register Vendor" : "Register Planner"}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-xl"
              onClick={() => toast("Google sign-in coming soon")}
            >
              <GoogleGlyph /> Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-xl"
              onClick={() => toast("Apple sign-in coming soon")}
            >
              <AppleGlyph /> Apple
            </Button>
          </div>

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

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 18 18" className="h-4 w-4">
      <path
        fill="#4285F4"
        d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.8741 2.6836-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.4673-.8059 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.8591-3.0477.8591-2.3441 0-4.3282-1.5831-5.0359-3.7104H.9573v2.3318C2.4382 15.9832 5.4818 18 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.9641 10.71c-.18-.54-.2823-1.1168-.2823-1.71s.1023-1.17.2823-1.71V4.9582H.9573C.3477 6.1732 0 7.5477 0 9s.3477 2.8268.9573 4.0418L3.9641 10.71z"
      />
      <path
        fill="#EA4335"
        d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.4259 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.9641 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"
      />
    </svg>
  );
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 384 512" className="h-4 w-3.5 fill-charcoal">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}
