import { getAdminUser } from "@/lib/auth";
import { updateAccount } from "./actions";

export default async function AdminAccountPage() {
  const user = await getAdminUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Account</h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted-foreground)]">
          Update admin email and password.
        </p>
      </div>

      <div className="max-w-xl rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-6 shadow-sm">
        <form action={updateAccount} className="space-y-4">
          <label className="block">
            <span className="text-sm">Email</span>
            <input
              name="email"
              defaultValue={user?.email || ""}
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm">New password</span>
            <input
              name="password"
              type="password"
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
              placeholder="Leave blank to keep current password"
            />
          </label>
          <button className="w-full rounded-md bg-[color:var(--color-brand-primary)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

