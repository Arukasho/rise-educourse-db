import pool from "../db.js";

const findAll = async () => {
  const result = await pool.query("SELECT * FROM kelas_saya ORDER BY id ASC");
  return result.rows;
};

const findById = async (id) => {
  const result = await pool.query("SELECT * FROM kelas_saya WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

const findByUserId = async (user_id) => {
  const result = await pool.query(
    "SELECT * FROM kelas_saya WHERE user_id = $1 ORDER BY id ASC",
    [user_id],
  );
  return result.rows;
};

const findByUserAndKelas = async (user_id, kelas_id) => {
  const result = await pool.query(
    "SELECT * FROM kelas_saya WHERE user_id = $1 AND kelas_id = $2",
    [user_id, kelas_id],
  );
  return result.rows[0];
};

const create = async (kelas_id, user_id, status) => {
  const query = `
    INSERT INTO kelas_saya (kelas_id, user_id, status)
    VALUES ($1, $2, COALESCE($3, 'active'))
    RETURNING *`;
  const result = await pool.query(query, [kelas_id, user_id, status]);
  return result.rows[0];
};

const update = async (id, status) => {
  const query =
    "UPDATE kelas_saya SET status = COALESCE($1, status) WHERE id = $2 RETURNING *";
  const result = await pool.query(query, [status, id]);
  return result.rows[0];
};

const deleteById = async (id) => {
  const query = "DELETE FROM kelas_saya WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export {
  findAll,
  findById,
  findByUserId,
  findByUserAndKelas,
  create,
  update,
  deleteById,
};
