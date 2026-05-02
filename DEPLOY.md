# Deploy (Production)

This project is a Next.js app designed for Vercel production using:

- Postgres (`DATABASE_URL`) for content + bookings
- Vercel Blob (`BLOB_READ_WRITE_TOKEN`) for uploads (logos, gallery, product images)

## Vercel (recommended)

1. Push this folder to a GitHub repo.
2. In Vercel, import the repo and set the Root Directory to `new-image-web`.
3. Add a Postgres integration from the Vercel Marketplace and copy its connection string into `DATABASE_URL` (Production + Preview).
4. Create a Vercel Blob store and set `BLOB_READ_WRITE_TOKEN` (Production + Preview).
5. Add env vars (Production + Preview):
   - `SESSION_SECRET` (long random string)
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `PUBLIC_BASE_URL` (your Vercel production URL or custom domain)
6. Deploy.

## Notes

- Admin login: `/admin/login`
- Uploads go to Vercel Blob when `BLOB_READ_WRITE_TOKEN` is set.
- Content lives in Postgres as a single JSON document in `app_state` (easy backups).
