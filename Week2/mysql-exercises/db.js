import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD } = process.env;

const db = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
});

db.connect((err) => {
  if (err) return console.error("~~ Error connecting: " + err.stack);
  console.log("-- Connected to MySQL");
});

export default db;
