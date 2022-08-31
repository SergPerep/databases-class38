import db from "../db.js";
import log from "../utils/log.js";
const useDb = ({ dbName = "transactions", isPrinting = false }) => {
  db.query(`USE ${dbName};`, (err) => {
    if (err) throw err.stack;
    if (isPrinting) log.basic(`-- Use database '${dbName}'`);
  });
};

export default useDb;
