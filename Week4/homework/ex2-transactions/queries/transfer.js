import log from "../utils/log.js";

const findNumberOfLastChange = async (accColl, accountNum, session) => {
  const filter = { num: accountNum };
  const account = await accColl.findOne(filter, { session });
  if (!account) throw new Error("Cannot find account with such number");
  const changeNumbersArr = account.changes.map((change) => change.num);
  return Math.max(...changeNumbersArr);
};

const updateBalanceAndChanges = async (
  accColl,
  session,
  { accountNum, amountNum, dateObj, remarkStr }
) => {
  const maxChangeNumber = await findNumberOfLastChange(
    accColl,
    accountNum,
    session
  );
  const filter = { num: accountNum };
  const newChange = {
    num: maxChangeNumber + 1,
    amount: amountNum,
    date: dateObj,
    remark: remarkStr,
  };
  const update = {
    $inc: { balance: amountNum },
    $push: { changes: newChange },
  };
  const result = await accColl.updateOne(filter, update, { session });
  const isSender = amountNum < 0;
  if (!result.modifiedCount || result.modifiedCount < 1)
    throw new Error(
      `FAILED to update balance of a ${isSender ? "sender" : "receiver"}`
    );

  log.green(`-- UPDATED doc of a ${isSender ? "sender" : "receiver"}`);
};

const transfer = async (
  accColl,
  client,
  { senderNum, receiverNum, amountNum, remarkStr }
) => {
  const session = client.startSession();
  if (!session) throw new Error("Cannot create a session");
  log.dim("-- Start session");
  try {
    await session.withTransaction(async () => {
      const now = new Date();
      await updateBalanceAndChanges(accColl, session, {
        accountNum: senderNum,
        amountNum: -amountNum,
        dateObj: now,
        remarkStr,
      });

      await updateBalanceAndChanges(accColl, session, {
        accountNum: receiverNum,
        amountNum,
        dateObj: now,
        remarkStr,
      });
    });
  } catch (err) {
    log.red("-- ABORT TRANSACTION");
    log.error(err);
  } finally {
    await session.endSession();
    log.dim("-- End session");
  }
};

export default transfer;
