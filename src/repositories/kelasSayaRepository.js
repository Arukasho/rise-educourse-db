// src/repositories/kelasSayaRepository.js
import pool from "../db.js";

const findAll = async ({
  search,
  sortBy = "id",
  order = "asc",
  page = 1,
  limit = 10,
} = {}) => {
  // Whitelist kolom yang boleh dipakai untuk sort (cegah SQL injection)
  const allowedSort = ["id", "enroll_date", "status"];
  const safeSortBy = allowedSort.includes(sortBy) ? sortBy : "id";
  const safeOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

  const values = [];
  let where = "";

  // Tambah kondisi search jika ada (cari di status)
  if (search) {
    values.push(`%${search}%`);
    where = `WHERE status ILIKE $${values.length}`;
  }

  // Pagination: LIMIT dan OFFSET
  const offset = (page - 1) * limit;
  values.push(limit, offset);

  const sql = `
    SELECT * FROM kelas_saya
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
    where = `WHERE status ILIKE $1`;
  }
  const result = await pool.query(
    `SELECT COUNT(*) FROM kelas_saya ${where}`,
    values,
  );
  return parseInt(result.rows[0].count, 10);
};

// GET BY ID
const findById = async (id) => {
  const result = await pool.query("SELECT * FROM kelas_saya WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

// GET BY USER_ID ("kelas saya" list for a user)
const findByUserId = async (user_id) => {
  const result = await pool.query(
    "SELECT * FROM kelas_saya WHERE user_id = $1 ORDER BY id ASC",
    [user_id],
  );
  return result.rows;
};

// CHECK IF USER ALREADY ENROLLED IN A KELAS
const findByUserAndKelas = async (user_id, kelas_id) => {
  const result = await pool.query(
    "SELECT * FROM kelas_saya WHERE user_id = $1 AND kelas_id = $2",
    [user_id, kelas_id],
  );
  return result.rows[0];
};

// INSERT (POST) - enroll
const create = async (kelas_id, user_id, status) => {
  const query = `
    INSERT INTO kelas_saya (kelas_id, user_id, status)
    VALUES ($1, $2, COALESCE($3, 'active'))
    RETURNING *`;
  const result = await pool.query(query, [kelas_id, user_id, status]);
  return result.rows[0];
};

// UPDATE (PATCH) - e.g. change status
const update = async (id, status) => {
  const query =
    "UPDATE kelas_saya SET status = COALESCE($1, status) WHERE id = $2 RETURNING *";
  const result = await pool.query(query, [status, id]);
  return result.rows[0];
};

// DELETE - unenroll
const deleteById = async (id) => {
  const query = "DELETE FROM kelas_saya WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export {
  findAll,
  countAll,
  findById,
  findByUserId,
  findByUserAndKelas,
  create,
  update,
  deleteById,
};
