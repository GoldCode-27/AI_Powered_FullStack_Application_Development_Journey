import bcrypt from "bcrypt";
import db from "../../../db/dbConfig.js";

const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
});

export const signup = async ({ name, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const [result] = await db.execute(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [name.trim(), normalizedEmail, passwordHash],
    );

    return { id: result.insertId, name: name.trim(), email: normalizedEmail };
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      const duplicateError = new Error(
        "An account with this email already exists.",
      );
      duplicateError.status = 409;
      throw duplicateError;
    }
    throw error;
  }
};

export const login = async ({ email, password }) => {
  const [rows] = await db.execute(
    "SELECT id, name, email, password_hash FROM users WHERE email = ? LIMIT 1",
    [email.trim().toLowerCase()],
  );
  const user = rows[0];

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    const error = new Error("Invalid email or password.");
    error.status = 401;
    throw error;
  }

  return publicUser(user);
};

export const getUserById = async (userId) => {
  if (!userId) return null;
  const [rows] = await db.execute(
    "SELECT id, name, email FROM users WHERE id = ? LIMIT 1",
    [userId],
  );
  return rows[0] || null;
};
