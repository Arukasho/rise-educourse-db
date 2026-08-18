import "dotenv/config";

import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  }
  console.log("Connected to the database");
  release();
});

export default pool;
