import mysql from "mysql";
import config from "./config";

const pool = mysql.createPool(config as mysql.PoolConfig);

const connection = pool.getConnection((err, conn) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected to the database.");
  }
});

export default connection;
