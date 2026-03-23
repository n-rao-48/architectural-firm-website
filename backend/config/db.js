import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import pg from 'pg';

dotenv.config();

const client = process.env.DATABASE_CLIENT || 'mysql';

let mysqlPool;
let pgPool;

if (client === 'postgres') {
  pgPool = new pg.Pool({
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT || 5432),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  });
} else if (client === 'mysql') {
  mysqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
  });
}

export async function query(sql, params = []) {
  if (client === 'memory') {
    throw new Error('query() is not available in memory mode');
  }

  if (client === 'postgres') {
    const result = await pgPool.query(sql, params);
    return result.rows;
  }

  const [rows] = await mysqlPool.execute(sql, params);
  return rows;
}

export function getDbClient() {
  return client;
}
