import postgres from "postgres";

let _sql: ReturnType<typeof postgres> | null = null;
let _schemaEnsured = false;

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
  if (_schemaEnsured) return;
  
  const db = sql();
  try {
    await db/* sql */`
      CREATE TABLE IF NOT EXISTS app_state (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `;
    _schemaEnsured = true;
  } catch (error) {
    // If the table already exists, mark as ensured and continue
    if ((error as any)?.message?.includes("already exists") || (error as any)?.code === "42P07") {
      _schemaEnsured = true;
    } else {
      throw error;
    }
  }
}

