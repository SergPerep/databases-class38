import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "HyF2022/FluSH1916",
});

db.connect((err) => {
  if (err) return console.error("~~ Error connecting: " + err.stack);
  console.log("-- Connected to MySQL");
});

export default db;
