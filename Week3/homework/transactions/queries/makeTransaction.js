import db from "../db.js";
import log from "../utils/log.js";

const execRollback = (err) =>
  db.rollback(() => {
    log.red("<- Rollback");
    throw err.stack;
  });

const makeTransaction = ({
  amount,
  sender_id,
  receiver_id,
  date,
  remark,
  isPrinting = false,
}) => {
  db.query("START TRANSACTION;", (err) => {
    if (err) throw err.stack;
    if (isPrinting) log.basic("-> Start transaction");
  });

  db.query(
    `INSERT INTO account_changes (account_number, amount, changed_date, remark)
        VALUES (?, ?, ?, ?);`,
    [sender_id, -amount, date, remark],
    (err) => {
      if (err) execRollback(err);
      if (isPrinting) {
        log.basic("-> Insert an account change:");
        log.dim({ sender_id, amount: -amount, date, remark });
      }
    }
  );

  db.query(
    `UPDATE accounts SET balance = balance - ? 
    WHERE account_number = ?;`,
    [amount, sender_id],
    (err) => {
      if (err) execRollback(err);
      if (isPrinting) {
        log.basic(`-> Update balance of account ${sender_id}:`);
        log.dim("-" + amount);
      }
    }
  );

  db.query(
    `INSERT INTO account_changes (account_number, amount, changed_date, remark)
    VALUES (?, ?, ?, ?);`,
    [receiver_id, amount, date, remark],
    (err) => {
      if (err) execRollback(err);
      if (isPrinting) {
        log.basic("-> Insert an account change:");
        log.dim({ receiver_id, amount, date, remark });
      }
    }
  );

  db.query(
    "UPDATE accounts SET balance = balance + ? WHERE account_number = ?;",
    [amount, receiver_id],
    (err) => {
      if (err) execRollback(err);
      if (isPrinting) {
        log.basic(`-> Update balance of account ${receiver_id}:`);
        log.dim("+" + amount);
      }
    }
  );

  db.query("COMMIT;", (err) => {
    if (err) throw err.stack;
    if (isPrinting) log.basic("-> Commit transaction");
  });
};

export default makeTransaction;
