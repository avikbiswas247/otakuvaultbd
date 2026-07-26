// lib/db/dbconnect.ts
import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

function createPool() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  });

  // Prevent unhandled 'error' events from crashing the process
  // (e.g. idle client errors, network blips)
  pool.on("error", (err) => {
    console.error("Unexpected PG pool error:", err);
  });

  return pool;
}

// Reuse the same pool across hot reloads in dev,
// and across serverless/module re-imports in general.
export const db = global._pgPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  global._pgPool = db;
}