import db from "./db.js";
import createBasicTables from "./queries/createBasicTables.js";
import createRelationTables from "./queries/createRelationTables.js";
import fillUpTables from "./queries/fillUpTables.js";
import printAssignments from "./queries/printAssignments.js";
import recreateDb from "./queries/recreateDB.js";
import useDb from "./queries/useDB.js";

const dbName = "scholar";

recreateDb({ dbName, isPrinting: true });
useDb({ dbName, isPrinting: true });
createBasicTables({ isPrinting: true });
createRelationTables({ isPrinting: true });
fillUpTables({ isPrinting: true });
printAssignments();
db.end();
