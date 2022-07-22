import mysql from "mysql";
import config from "./config";

const pool = mysql.createPool(config.db);

export const poolQuery = (query: string, values: any[]): Promise<any> =>
  new Promise((resolve, reject) => {
    pool.query(query, values, (err, results, _fields) => {
      if (err) reject(err);

      resolve(results);
    });
  });
