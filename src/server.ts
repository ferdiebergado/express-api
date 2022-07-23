import http from "http";
import pool from "./db";
import app from "./app";

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const start = async () => {
  await pool.getConnection();

  console.log("Connected to the database.");

  server.listen(PORT, () =>
    console.log("Server listening on port " + PORT + "...")
  );
};

start();
