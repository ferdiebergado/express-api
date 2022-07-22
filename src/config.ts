import mysql from "mysql";

export default {
  db: {
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || "user",
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE || "test",
    supportBigNumbers: true,
  } as mysql.PoolConfig,
};
