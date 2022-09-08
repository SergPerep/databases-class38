import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import recipesArr from "./data/recipes.js";
dotenv.config();

// Connection URI
const { MONGODB_USER, MONGODB_PASSWORD } = process.env;
const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.s0yec.mongodb.net/?retryWrites=true&w=majority`;

const setUpCategories = async (catColl) => {
  {
    const result = await catColl.deleteMany({});
    console.log(`-- Deleted ${result.deletedCount} docs from categories`);
  }
  const catArr = recipesArr.reduce((prevVal, curVal) => {
    return [...prevVal, ...curVal.categories];
  }, []);

  const catSet = new Set(catArr);

  const result = await catColl.insertMany(
    [...catSet].map((category) => ({ name: category }))
  );
  console.log(`-- Inserted ${result.insertedCount} docs into categories`);
};

const setUpIngredients = async (ingColl) => {
  {
    const result = await ingColl.deleteMany({});
    console.log(`-- Deleted ${result.deletedCount} docs from ingredients`);
  }
  const ingArr = recipesArr.reduce((prevVal, curVal) => {
    return [...prevVal, ...curVal.ingredients];
  }, []);

  const ingSet = new Set(ingArr);
  const result = await ingColl.insertMany(
    [...ingSet].map((ingredient) => ({ name: ingredient }))
  );
  console.log(`-- Inserted ${result.insertedCount} docs into ingredients`);
};

const setUpRecipes = async (recColl, catColl, ingColl) => {
  {
    const result = await recColl.deleteMany({});
    console.log(`-- Deleted ${result.deletedCount} docs from recipes`);
  }
  const recipes = await Promise.all(
    recipesArr.map(async (recipe) => {
      const categories = await Promise.all(
        recipe.categories.map(async (catStr) => {
          const cat = await catColl.findOne({ name: catStr });
          return cat._id.toString();
        })
      );
      const ingredients = await Promise.all(
        recipe.ingredients.map(async (ingStr) => {
          const ing = await ingColl.findOne({ name: ingStr });
          return ing._id.toString();
        })
      );
      return { ...recipe, categories, ingredients };
    })
  );

  const result = await recColl.insertMany(recipes);

  console.log(`-- Inserted ${result.insertedCount} docs into recipes`);
};

// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    const db = client.db("cookbook");
    await db.command({ ping: 1 });
    console.log("-> Connected successfully to mongoDb");
    const categories = db.collection("categories");
    const ingredients = db.collection("ingredients");
    const recipes = db.collection("recipes");
    await setUpCategories(categories);
    await setUpIngredients(ingredients);
    await setUpRecipes(recipes, categories, ingredients);
  } catch (err) {
    console.error(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
