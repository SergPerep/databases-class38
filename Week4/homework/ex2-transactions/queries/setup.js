import accounts from "../datasets/accounts.js";
import log from "../utils/log.js";

const deleteAllAccounts = async (accColl) => {
  const result = await accColl.deleteMany({});
  log.green(
    `-- DELETED ${result.deletedCount} docs from 'accounts' collection`
  );
};

const fillUpAccounts = async (accColl) => {
  const result = await accColl.insertMany(accounts);
  log.green(
    `-- INSERTED ${result.insertedCount} docs into 'accounts' collection`
  );
};

const setup = async (accColl) => {
  await deleteAllAccounts(accColl);
  await fillUpAccounts(accColl);
};

export default setup;
