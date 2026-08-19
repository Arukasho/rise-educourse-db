// src/repositories/materialRepository.js
import pool from "../db.js";

const findAll = async ({
  search,
  sortBy = "id",
  order = "asc",
  page = 1,
  limit = 10,
} = {}) => {
  // Whitelist kolom yang boleh dipakai untuk sort (cegah SQL injection)
  const allowedSort = ["id", "title", "type"];
  const safeSortBy = allowedSort.includes(sortBy) ? sortBy : "id";
  const safeOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

  const values = [];
  let where = "";

  // Tambah kondisi search jika ada (cari di title atau type)
  if (search) {
    values.push(`%${search}%`);
    where = `WHERE title ILIKE $${values.length} OR type ILIKE $${values.length}`;
  }

  // Pagination: LIMIT dan OFFSET
  const offset = (page - 1) * limit;
  values.push(limit, offset);

  const sql = `
    SELECT * FROM material
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
    where = `WHERE title ILIKE $1 OR type ILIKE $1`;
  }
  const result = await pool.query(
    `SELECT COUNT(*) FROM material ${where}`,
    values,
  );
  return parseInt(result.rows[0].count, 10);
};

// GET BY ID
const findById = async (id) => {
  const result = await pool.query("SELECT * FROM material WHERE id = $1", [id]);
  return result.rows[0];
};

// GET BY MODUL_ID (list of materials in a module)
const findByModulId = async (modul_id) => {
  const result = await pool.query(
    "SELECT * FROM material WHERE modul_id = $1 ORDER BY id ASC",
    [modul_id],
  );
  return result.rows;
};

// INSERT (POST)
const create = async (modul_id, type, title, video_url) => {
  const query =
    "INSERT INTO material (modul_id, type, title, video_url) VALUES ($1, $2, $3, $4) RETURNING *";
  const result = await pool.query(query, [modul_id, type, title, video_url]);
  return result.rows[0];
};

// UPDATE (PATCH)
const update = async (id, modul_id, type, title, video_url, thumbnail_url) => {
  const query = `
    UPDATE material
    SET modul_id = COALESCE($1, modul_id),
        type = COALESCE($2, type),
        title = COALESCE($3, title),
        video_url = COALESCE($4, video_url),
        thumbnail_url = COALESCE($5, thumbnail_url)
    WHERE id = $6
    RETURNING *`;
  const result = await pool.query(query, [
    modul_id,
    type,
    title,
    video_url,
    thumbnail_url,
    id,
  ]);
  return result.rows[0];
};

// DELETE
const deleteById = async (id) => {
  const query = "DELETE FROM material WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export {
  findAll,
  countAll,
  findById,
  findByModulId,
  create,
  update,
  deleteById,
};
