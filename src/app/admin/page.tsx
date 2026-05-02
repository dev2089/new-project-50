import { getDB } from "@/lib/store";

export default async function AdminDashboard() {
  const db = await getDB();
  const recent = [...db.bookings].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, 8);

  const cards = [
    { label: "Bookings", value: db.bookings.length },
    { label: "Services", value: db.services.filter((s) => s.active).length },
    { label: "Courses", value: db.courses.filter((c) => c.active).length },
    { label: "Products", value: db.products.filter((p) => p.active).length },
    { label: "Media", value: db.media.length },
    { label: "Pages", value: db.pages.filter((p) => p.published).length },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted-foreground)]">
          Live overview of what’s happening on the website.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-5 shadow-sm"
          >
            <div className="text-sm text-[color:var(--color-muted-foreground)]">{c.label}</div>
            <div className="mt-2 text-2xl font-semibold">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] shadow-sm">
        <div className="border-b border-[color:var(--color-border)] px-5 py-4">
          <div className="text-sm font-semibold">Recent bookings</div>
        </div>
        <div className="p-5">
          {recent.length === 0 ? (
            <div className="text-sm text-[color:var(--color-muted-foreground)]">
              No bookings yet. Once users book via WhatsApp, they’ll appear here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-[color:var(--color-muted-foreground)]">
                  <tr>
                    <th className="py-2 pr-3">When</th>
                    <th className="py-2 pr-3">Name</th>
                    <th className="py-2 pr-3">Service</th>
                    <th className="py-2 pr-3">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((b) => (
                    <tr key={b.id} className="border-t border-[color:var(--color-border)]">
                      <td className="py-2 pr-3">{new Date(b.createdAt).toLocaleString()}</td>
                      <td className="py-2 pr-3">{b.name}</td>
                      <td className="py-2 pr-3">{b.serviceName || "-"}</td>
                      <td className="py-2 pr-3">{b.phone || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

