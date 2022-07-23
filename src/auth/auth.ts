import { FieldPacket, ResultSetHeader } from "mysql2";
import db from "../db";
import { UserAlreadyExistsError, UserNotFoundError } from "../errors";

export default {
  register: async (email: string, password: string) => {
    const sql = "INSERT INTO users (email, password) VALUES (?, ?)";

    try {
      const [rows, _]: [ResultSetHeader, FieldPacket[]] = await db.query(sql, [
        email,
        password,
      ]);

      return rows.insertId;
    } catch (error: any) {
      if (error.code === "ER_DUP_ENTRY") {
        throw new UserAlreadyExistsError(email);
      } else {
        throw error;
      }
    }
  },

  login: async (email: string, password: string) => {
    const sql =
      "SELECT id, email FROM users WHERE email = ? AND password = ? LIMIT 1";

    const [rows, _]: [any[], FieldPacket[]] = await db.query(sql, [
      email,
      password,
    ]);

    if (rows.length === 0) throw new UserNotFoundError();

    return rows[0];
  },

  // TODO
  forgotPassword: async (email: string) => {},

  // TODO
  resetPassword: async (currentPassword: string, newPassword: string) => {},
};
