import pool from "../db.js";

const findAll = async () => {
  const result = await pool.query("SELECT * FROM material ORDER BY id ASC");
  return result.rows;
};

const findById = async (id) => {
  const result = await pool.query("SELECT * FROM material WHERE id = $1", [id]);
  return result.rows[0];
};

const findByModulId = async (modul_id) => {
  const result = await pool.query(
    "SELECT * FROM material WHERE modul_id = $1 ORDER BY id ASC",
    [modul_id],
  );
  return result.rows;
};

const create = async (modul_id, type, title, video_url) => {
  const query =
    "INSERT INTO material (modul_id, type, title, video_url) VALUES ($1, $2, $3, $4) RETURNING *";
  const result = await pool.query(query, [modul_id, type, title, video_url]);
  return result.rows[0];
};

const update = async (id, modul_id, type, title, video_url) => {
  const query = `
    UPDATE material
    SET modul_id = COALESCE($1, modul_id),
        type = COALESCE($2, type),
        title = COALESCE($3, title),
        video_url = COALESCE($4, video_url)
    WHERE id = $5
    RETURNING *`;
  const result = await pool.query(query, [
    modul_id,
    type,
    title,
    video_url,
    id,
  ]);
  return result.rows[0];
};

const deleteById = async (id) => {
  const query = "DELETE FROM material WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export { findAll, findById, findByModulId, create, update, deleteById };
