import db from "./db.js";
import createTables from "./queries/createTables.js";
import recreateDb from "./queries/recreateDb.js";
import useDb from "./queries/useDb.js";
import fillUpTables from "./queries/fillUpTables.js";
import makeTransaction from "./queries/makeTransaction.js";
const dbName = "transactions";

recreateDb({ dbName, isPrinting: true });
useDb({ dbName, isPrinting: true });
createTables({ isPrinting: true });
fillUpTables({ isPrinting: true });
makeTransaction({
  amount: 1000,
  sender_id: 104,
  receiver_id: 102,
  remark: "A gift",
  date: "2022-08-31",
  isPrinting: true,
});

db.end();
