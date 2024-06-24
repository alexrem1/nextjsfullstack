import mysql from "mysql2/promise";

const createConnection = async () => {
  return mysql.createConnection({
    host: process.env.DB_HOST_ONLINE,
    user: process.env.DB_USER_ONLINE,
    password: process.env.DB_PASSWORD_ONLINE,
    database: process.env.DB_DB_ONLINE,
  });
};

export const db = {
  getConnection: createConnection,
};
