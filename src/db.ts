import mysql from "mysql2";
import config from "./config";

const pool = mysql.createPool(config.db);

export default pool.promise();
