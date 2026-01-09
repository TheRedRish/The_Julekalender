import db from "../connection.js";

export function getUserByEmail(email) {
  return db.get("SELECT * FROM users WHERE email = ?", [email]);
}

export function getUserByUsername(username) {
  return db.get("SELECT * FROM users WHERE username = ?", [username]);
}

export function getUserById(id) {
  return db.get("SELECT id, username, email FROM users WHERE id = ?", [id]);
}

export function createUser(email, username, passwordHash) {
  return db
    .run("INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)", [
      email,
      username,
      passwordHash,
    ])
    .then(({ lastID }) => ({ id: lastID, username, email }));
}

export function updateUserPassword(email, passwordHash) {
  return db.run("UPDATE users SET password_hash = ? WHERE email = ?", [passwordHash, email]);
}
