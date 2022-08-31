import db from "../db.js";
import log from "../utils/log.js";
const createTables = ({ isPrinting = false }) => {
  // ACCOUNTS
  db.query(
    `CREATE TABLE accounts (
      account_number INT PRIMARY KEY AUTO_INCREMENT,
      balance DECIMAL(12, 2) NOT NULL
    );`,
    (err) => {
      if (err) throw err;
      if (isPrinting) log.green("++ Create basic table 'accounts'");
    }
  );

  // ACCOUNT CHANGES
  db.query(
    `CREATE TABLE account_changes (
      change_number INT PRIMARY KEY AUTO_INCREMENT,
      account_number INT NOT NULL,
      amount DECIMAL(12, 2) NOT NULL,
      changed_date DATE NOT NULL,
      remark VARCHAR(255),
      FOREIGN KEY (account_number) REFERENCES accounts(account_number)
    );`,
    (err) => {
      if (err) throw err;
      if (isPrinting) log.green("++ Create basic table 'account_changes'");
    }
  );
};

export default createTables;
