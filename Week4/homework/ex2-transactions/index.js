import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import setup from "./queries/setup.js";
import transfer from "./queries/transfer.js";
import log from "./utils/log.js";
dotenv.config();

// Connection URI
const { MONGODB_USER, MONGODB_PASSWORD } = process.env;
const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.s0yec.mongodb.net/?retryWrites=true&w=majority`;

// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    const db = client.db("databaseWeek4");
    const accColl = db.collection("accounts");
    await db.command({ ping: 1 });
    log.green("-> Connected to MongoDB");
    await setup(accColl);
    await transfer(accColl, client, {
      senderNum: 101,
      receiverNum: 102,
      amountNum: 1000,
      remarkStr: "Gift",
    });
  } catch (err) {
    log.error(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
