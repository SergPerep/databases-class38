import db from "../db.js";
import log from "../utils/log.js";

const recreateDb = ({ dbName = "scholar", isPrinting = false }) => {
  db.query(`DROP DATABASE IF EXISTS ${dbName};`, (err) => {
    if (err) throw err.stack;
    if (isPrinting) log.red("-- Delete database if exists");
  });

  db.query(`CREATE DATABASE ${dbName};`, (err) => {
    if (err) throw err.stack;
    if (isPrinting) log.green("++ Create database");
  });
};

export default recreateDb;
