import db from "../db.js";
import log from "../utils/log.js";
const createRelationTables = ({ isPrinting = false }) => {
  // CATEGORIZATION
  db.query(
    `CREATE TABLE categorization (
        recipe_id INT NOT NULL,
        category_id INT NOT NULL,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        FOREIGN KEY (category_id) REFERENCES categories(id),
        PRIMARY KEY (recipe_id, category_id)
    );`,
    (err) => {
      if (err) throw err;
      if (isPrinting) log.green("++ Create relational table 'categorization'");
    }
  );

  // COMPOSITION
  db.query(
    `CREATE TABLE composition (
        recipe_id INT NOT NULL,
        ingredient_id INT NOT NULL,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
        PRIMARY KEY (recipe_id, ingredient_id)
    );`,
    (err) => {
      if (err) throw err;
      if (isPrinting) log.green("++ Create relational table 'composition'");
    }
  );

  // STEP ORDER
  db.query(
    `CREATE TABLE step_order (
        recipe_id INT NOT NULL,
        step_index INT NOT NULL,
        step_id INT NOT NULL,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        FOREIGN KEY (step_id) REFERENCES steps(id),
        PRIMARY KEY (recipe_id, step_id, step_index),
        CONSTRAINT unique_combination UNIQUE(recipe_id, step_index)
    );`,
    (err) => {
      if (err) throw err;
      if (isPrinting) log.green("++ Create relational table 'step_order'");
    }
  );
};

export default createRelationTables;
