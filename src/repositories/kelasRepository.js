// src/repositories/kelasRepository.js
import pool from "../db.js";

const findAll = async ({
  search,
  sortBy = "id",
  order = "asc",
  page = 1,
  limit = 10,
} = {}) => {
  // Whitelist kolom yang boleh dipakai untuk sort (cegah SQL injection)
  const allowedSort = ["id", "title", "price"];
  const safeSortBy = allowedSort.includes(sortBy) ? sortBy : "id";
  const safeOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

  const values = [];
  let where = "";

  // Tambah kondisi search jika ada (cari di title)
  if (search) {
    values.push(`%${search}%`);
    where = `WHERE title ILIKE $${values.length}`;
  }

  // Pagination: LIMIT dan OFFSET
  const offset = (page - 1) * limit;
  values.push(limit, offset);

  const sql = `
    SELECT * FROM kelas
    ${where}
    ORDER BY ${safeSortBy} ${safeOrder}
    LIMIT $${values.length - 1} OFFSET $${values.length}
  `;

  const result = await pool.query(sql, values);
  return result.rows;
};

// Count total rows untuk pagination meta
const countAll = async (search) => {
  const values = [];
  let where = "";
  if (search) {
    values.push(`%${search}%`);
    where = `WHERE title ILIKE $1`;
  }
  const result = await pool.query(
    `SELECT COUNT(*) FROM kelas ${where}`,
    values,
  );
  return parseInt(result.rows[0].count, 10);
};

// GET BY ID
const findById = async (id) => {
  const result = await pool.query("SELECT * FROM kelas WHERE id = $1", [id]);
  return result.rows[0];
};

// INSERT (POST)
const create = async (tutor_id, kategori_id, title, price) => {
  const query =
    "INSERT INTO kelas (tutor_id, kategori_id, title, price) VALUES ($1, $2, $3, $4) RETURNING *";
  const result = await pool.query(query, [tutor_id, kategori_id, title, price]);
  return result.rows[0];
};

// UPDATE (PATCH)
const update = async (id, tutor_id, kategori_id, title, price) => {
  const query = `
    UPDATE kelas
    SET tutor_id = COALESCE($1, tutor_id),
        kategori_id = COALESCE($2, kategori_id),
        title = COALESCE($3, title),
        price = COALESCE($4, price)
    WHERE id = $5
    RETURNING *`;
  const result = await pool.query(query, [
    tutor_id,
    kategori_id,
    title,
    price,
    id,
  ]);
  return result.rows[0];
};

// DELETE
const deleteById = async (id) => {
  const query = "DELETE FROM kelas WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export { findAll, countAll, findById, create, update, deleteById };
