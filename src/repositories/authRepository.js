import pool from "../db.js";

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

const createUser = async (fullName, email, hashedPassword, userName) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const userResult = await client.query(
      "INSERT INTO users (full_name, email, password_hash, user_name) VALUES ($1, $2, $3, $4) RETURNING id, email, user_name, created_at",
      [fullName, email, hashedPassword, userName],
    );
    const user = userResult.rows[0];

    await client.query("COMMIT");
    return user;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const setVerificationToken = async (userId, token, expiresAt) => {
  const query = `
    UPDATE "users"
    SET verification_token = $1, verification_token_expires = $2
    WHERE id = $3
    RETURNING *`;
  const result = await pool.query(query, [token, expiresAt, userId]);
  return result.rows[0];
};

const findByVerificationToken = async (token) => {
  const result = await pool.query(
    'SELECT * FROM "users" WHERE verification_token = $1',
    [token],
  );
  return result.rows[0];
};

const markAsVerified = async (userId) => {
  const query = `
    UPDATE "users"
    SET is_verified = true, verification_token = NULL, verification_token_expires = NULL
    WHERE id = $1
    RETURNING *`;
  const result = await pool.query(query, [userId]);
  return result.rows[0];
};

export {
  findUserByEmail,
  createUser,
  setVerificationToken,
  findByVerificationToken,
  markAsVerified,
};
