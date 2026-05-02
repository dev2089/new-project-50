import { getDB } from "@/lib/store";

export default async function AdminBookingsPage() {
  const db = await getDB();
  const bookings = [...db.bookings].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Bookings</h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted-foreground)]">
          Logged when users confirm and get redirected to WhatsApp.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[color:var(--color-muted)] text-xs text-[color:var(--color-muted-foreground)]">
              <tr>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Preferred</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-sm text-[color:var(--color-muted-foreground)]" colSpan={5}>
                    No bookings yet.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="border-t border-[color:var(--color-border)]">
                    <td className="px-4 py-3">{new Date(b.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-3">{b.name}</td>
                    <td className="px-4 py-3">{b.serviceName || "-"}</td>
                    <td className="px-4 py-3">{b.phone || "-"}</td>
                    <td className="px-4 py-3">{b.preferredDateText || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

