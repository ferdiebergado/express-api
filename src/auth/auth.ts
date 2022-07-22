import * as db from "../db";

export const register = async (email: string, password: string) => {
  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";

  const result = await db.poolQuery(sql, [email, password]);

  return result.insertId;
};
