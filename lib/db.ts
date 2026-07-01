import sql from "mssql";

// Konfigurasi diambil dari .env.local
const config: sql.config = {
  server: process.env.DB_SERVER || "localhost",
  database: process.env.DB_NAME || "helpdesk",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: false, // true jika pakai Azure SQL
    trustServerCertificate: true, // untuk koneksi local/dev
    // Isi HANYA jika pakai named instance (misal MSSQLSERVER03).
    // Kalau default instance, hapus baris DB_INSTANCE dari .env.local.
    ...(process.env.DB_INSTANCE ? { instanceName: process.env.DB_INSTANCE } : {}),
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

// Gunakan global cache supaya pool tidak dibuat berulang-ulang saat hot reload (Next.js dev)
declare global {
  // eslint-disable-next-line no-var
  var _sqlPool: sql.ConnectionPool | undefined;
}

export async function getPool(): Promise<sql.ConnectionPool> {
  if (global._sqlPool && global._sqlPool.connected) {
    return global._sqlPool;
  }

  const pool = new sql.ConnectionPool(config);
  await pool.connect();
  global._sqlPool = pool;
  return pool;
}

export { sql };