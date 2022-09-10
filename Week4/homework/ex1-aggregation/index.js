import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import log from "./utils/log.js";
dotenv.config();

// Connection URI
const { MONGODB_USER, MONGODB_PASSWORD } = process.env;
const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.s0yec.mongodb.net/?retryWrites=true&w=majority`;

const getResult = async ({
  title,
  collection,
  pipeline,
  printAs = "string",
}) => {
  log.dim(`\n${title.toUpperCase()}:`);
  const aggCursor = collection.aggregate(pipeline);
  let docs = [];
  for await (const doc of aggCursor) {
    docs = [...docs, doc];
  }
  if (printAs.toLowerCase() === "table") {
    console.table(docs);
  } else {
    console.log(docs);
  }
};

const getPopulationForYearAndAge = async (yearNum, ageStr, collection) => {
  const title = `Population of ${ageStr}years old for every country in ${yearNum}`;
  const pipeline = [
    { $match: { Year: yearNum, Age: ageStr } },
    { $addFields: { TotalPopulation: { $add: ["$F", "$M"] } } },
    { $sort: { Country: 1 } },
  ];
  await getResult({ title, collection, pipeline, printAs: "table" });
};

const getTotalPopulationForCountry = async (countryStr, collection) => {
  const title = `Total population per year for ${countryStr}`;
  const pipeline = [
    { $match: { Country: countryStr } },
    { $addFields: { countPopulation: { $add: ["$M", "$F"] } } },
    { $group: { _id: "$Year", countPopulation: { $sum: "$countPopulation" } } },
    { $sort: { _id: 1 } },
  ];
  await getResult({ title, collection, pipeline, printAs: "table" });
};

// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    const db = client.db("databaseWeek4");
    const population = db.collection("population");
    await db.command({ ping: 1 });
    log.green("--> Connected successfully to mongoDB");
    await getTotalPopulationForCountry("Netherlands", population);
    await getPopulationForYearAndAge(2020, "100+", population);
  } catch (err) {
    console.error(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
