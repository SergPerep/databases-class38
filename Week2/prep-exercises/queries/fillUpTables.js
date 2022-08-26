import db from "../db.js";
import log from "../utils/log.js";
import categorization from "../mock-data/categorization.js";
import categories from "../mock-data/categories.js";
import composition from "../mock-data/composition.js";
import ingredients from "../mock-data/ingredients.js";
import recipes from "../mock-data/recipes.js";
import steps from "../mock-data/steps.js";
import step_order from "../mock-data/step_order.js";

const fillUpTables = ({ isPrinting = false }) => {
  // CATEGORIES
  categories.forEach((category) => {
    db.query(
      "INSERT INTO categories (name) VALUES (?);",
      [category.name],
      (err) => {
        if (err) throw err.stack;
        if (isPrinting) {
          log.basic("-> Insert a category:");
          log.dim({ name: category.name });
        }
      }
    );
  });

  // STEPS
  steps.forEach((step) => {
    db.query(
      "INSERT INTO steps (description) VALUES (?);",
      [step.desc],
      (err) => {
        if (err) throw err.stack;
        if (isPrinting) {
          log.basic("-> Insert a step:");
          log.dim({ desc: step.desc });
        }
      }
    );
  });

  // INGREDIENTS
  ingredients.forEach((ingredient) => {
    db.query(
      "INSERT INTO ingredients (name) VALUES (?);",
      [ingredient.name],
      (err) => {
        if (err) throw err.stack;
        if (isPrinting) {
          log.basic("-> Insert an ingredient:");
          log.dim({ name: ingredient.name });
        }
      }
    );
  });

  // RECIPE
  recipes.forEach((recipe) => {
    db.query(
      "INSERT INTO recipes (title) VALUES (?);",
      [recipe.title],
      (err) => {
        if (err) throw err.stack;
        if (isPrinting) {
          log.basic("-> Insert a recipe:");
          log.dim({ title: recipe.title });
        }
      }
    );
  });

  // CATEGORIZATION
  categorization.forEach((item) => {
    const { recipe_id, category_id } = item;
    db.query(
      "INSERT INTO categorization (recipe_id, category_id) VALUES (?, ?);",
      [recipe_id, category_id],
      (err) => {
        if (err) throw err.stack;
        if (isPrinting) {
          log.basic("-> Insert a categorization:");
          log.dim({ recipe_id, category_id });
        }
      }
    );
  });

  // COMPOSITION
  composition.forEach((item) => {
    const { recipe_id, ingredient_id } = item;
    db.query(
      "INSERT INTO composition (recipe_id, ingredient_id) VALUES (?, ?);",
      [recipe_id, ingredient_id],
      (err) => {
        if (err) throw err.stack;
        if (isPrinting) {
          log.basic("-> Insert a composition:");
          log.dim({ recipe_id, ingredient_id });
        }
      }
    );
  });

  // STEP ORDER
  step_order.forEach((item) => {
    const { recipe_id, step_index, step_id } = item;
    db.query(
      "INSERT INTO step_order (recipe_id, step_index, step_id) VALUES (?, ?, ?);",
      [recipe_id, step_index, step_id],
      (err) => {
        if (err) throw err.stack;
        if (isPrinting) {
          log.basic("-> Insert a step order:");
          log.dim({ recipe_id, step_index, step_id });
        }
      }
    );
  });
};

export default fillUpTables;
