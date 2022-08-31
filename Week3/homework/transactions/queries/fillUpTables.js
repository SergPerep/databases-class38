import db from "../db.js";
import log from "../utils/log.js";
import accounts from "../mock-data/accounts.js";
import accountChanges from "../mock-data/account-changes.js";

const fillUpTables = ({ isPrinting = false }) => {
  // ACCOUNTS
  accounts.forEach((account) => {
    db.query(
      "INSERT INTO accounts (balance) VALUES (?);",
      [account.balance],
      (err) => {
        if (err) throw err.stack;
        if (isPrinting) {
          log.basic("-> Insert an account:");
          log.dim({ balance: account.balance });
        }
      }
    );
  });

  // ACCOUNT CHANGES
  accountChanges.forEach((change) => {
    db.query(
      `INSERT INTO account_changes (account_number, amount, changed_date, remark)
      VALUES (?, ?, ?, ?);`,
      [change.account_number, change.amount, change.change_date, change.remark],
      (err) => {
        if (err) throw err.stack;
        if (isPrinting) {
          log.basic("-> Insert an account change:");
          log.dim(change);
        }
      }
    );
  });
};

export default fillUpTables;
