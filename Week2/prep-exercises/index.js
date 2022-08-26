import db from "./db.js";
import createBasicTables from "./queries/createBasicTables.js";
import createRelationTables from "./queries/createRelationTables.js";
import fillUpTables from "./queries/fillUpTables.js";
import recreateDb from "./queries/recreateDb.js";
import useDb from "./queries/useDb.js";
import printAssignments from "./queries/printAssignments.js";

const dbName = "cookbook";

recreateDb({ dbName, isPrinting: true });
useDb({ dbName, isPrinting: true });
createBasicTables({ isPrinting: true });
createRelationTables({ isPrinting: true });
fillUpTables({ isPrinting: true });
printAssignments();

db.end();
