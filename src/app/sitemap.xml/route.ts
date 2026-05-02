import { getDB } from "@/lib/store";

export async function GET() {
  const db = await getDB();
  const base = process.env.PUBLIC_BASE_URL || "http://localhost:3000";

  const staticPaths = ["/", "/about", "/services", "/academy", "/gallery", "/reviews", "/contact", "/book"];
  const pagePaths = db.pages.filter((p) => p.published).map((p) => `/p/${p.slug}`);

  const urls = [...staticPaths, ...pagePaths].map((p) => `${base}${p}`);
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n") +
    `\n</urlset>\n`;

  return new Response(xml, {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
}
