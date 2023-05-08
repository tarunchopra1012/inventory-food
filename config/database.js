import { DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD, DB_PORT } from './config.js';
import mysqlLib from 'serverless-mysql';

const creds = {
  host: DB_HOST,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT
};

const conn = mysqlLib({
  config: creds
});

conn.connect();
conn.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) throw err;
  console.log("Connected!");
});
conn.end();

export {
    conn
};
