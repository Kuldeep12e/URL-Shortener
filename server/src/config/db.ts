import { Pool } from 'pg';
import { config } from './env';

export const pool = new Pool({
  connectionString: config.databaseUrl
});

// Simple schema init on startup
export async function initDb() {
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS links (
      code VARCHAR(8) PRIMARY KEY,
      target_url TEXT NOT NULL,
      total_clicks INT NOT NULL DEFAULT 0,
      last_clicked_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  await pool.query(createTableSql);
}
