import { requireAdminUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  try {
    await requireAdminUser();
  } catch {
    redirect("/admin/login");
  }

  const nav = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/settings", label: "Settings" },
    { href: "/admin/bookings", label: "Bookings" },
    { href: "/admin/services", label: "Services" },
    { href: "/admin/academy", label: "Academy" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/gallery", label: "Gallery" },
    { href: "/admin/pages", label: "Pages" },
    { href: "/admin/reviews", label: "Reviews" },
    { href: "/admin/account", label: "Account" },
  ];

  return (
    <div className="min-h-full bg-[color:var(--color-background)]">
      <div className="border-b border-[color:var(--color-border)] bg-[color:var(--color-muted)]">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3">
          <Link href="/" className="text-sm font-semibold">
            Admin
          </Link>
          <nav className="ml-auto flex flex-wrap items-center gap-3">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-md px-2 py-1 text-sm text-[color:var(--color-muted-foreground)] hover:bg-[color:var(--color-background)] hover:text-[color:var(--color-foreground)]"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 py-8">{children}</div>
    </div>
  );
}
