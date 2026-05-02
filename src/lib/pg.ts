import postgres from "postgres";

let _sql: ReturnType<typeof postgres> | null = null;

export function sql() {
  if (_sql) return _sql;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("Missing env var: DATABASE_URL");
  _sql = postgres(url, {
    max: 5,
    idle_timeout: 20,
    connect_timeout: 10,
    prepare: false,
  });
  return _sql;
}

export async function ensureSchema() {
  const db = sql();
  await db/* sql */`
    CREATE TABLE IF NOT EXISTS app_state (
      id TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;
}

