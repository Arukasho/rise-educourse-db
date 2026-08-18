import pool from "../db.js";

const findAll = async () => {
  const result = await pool.query("SELECT * FROM kelas ORDER BY id ASC");
  return result.rows;
};

const findById = async (id) => {
  const result = await pool.query("SELECT * FROM kelas WHERE id = $1", [id]);
  return result.rows[0];
};

const create = async (tutor_id, kategori_id, title, price) => {
  const query =
    "INSERT INTO kelas (tutor_id, kategori_id, title, price) VALUES ($1, $2, $3, $4) RETURNING *";
  const result = await pool.query(query, [tutor_id, kategori_id, title, price]);
  return result.rows[0];
};

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

const deleteById = async (id) => {
  const query = "DELETE FROM kelas WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export { findAll, findById, create, update, deleteById };
