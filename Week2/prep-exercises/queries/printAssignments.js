import db from "../db.js";
import log from "../utils/log.js";

const getResults = (title, queryStr, callback) => {
  db.query(queryStr, (err, results) => {
    log.dim("\n" + title.toUpperCase());
    if (err) throw err;
    callback(results);
  });
};

const printAssignments = () => {
  // Print all the vegetarian recipes having salt
  getResults(
    "All the vegetarian recipes having salt:",
    `WITH recipes_categorization AS (
      SELECT DISTINCT title AS 'recipe_title', id AS 'recipe_id'
      FROM recipes 
      JOIN categorization ON categorization.recipe_id = recipes.id
    ), categorization_categories AS (
        SELECT recipe_id, name AS 'category_name'
        FROM categorization 
        JOIN categories ON categorization.category_id = categories.id
        WHERE name='Vegetarian'
    ), composition_ingredients AS (
        SELECT * FROM composition
        JOIN ingredients ON composition.ingredient_id = ingredients.id
        WHERE name='Salt'
    ), recipes_categories AS (
        SELECT recipes_categorization.recipe_id as 'recipe_id', recipe_title, category_name 
        FROM recipes_categorization
        JOIN categorization_categories 
            ON recipes_categorization.recipe_id = categorization_categories.recipe_id
    )
    SELECT  recipe_title AS 'Recipe', category_name AS 'Category', name AS 'Ingredient'
    FROM recipes_categories
    JOIN composition_ingredients 
    ON recipes_categories.recipe_id = composition_ingredients.recipe_id;`,
    (results) => console.table(results)
  );

  // Print all the cakes that do not need baking
  getResults(
    "All the cakes that do not need baking:",
    `WITH categories_categorization AS (
      SELECT recipe_id, name AS 'category_name' FROM categorization 
      JOIN categories ON categorization.category_id = categories.id 
      WHERE name = 'Cake' OR name = 'No-bake'
    ), no_bake_cake_categorization AS (
        SELECT recipe_id, 
            CASE 
                WHEN COUNT(*) >= 2
                THEN 'No-bake cake'
            END
            AS 'category_name'
            FROM categories_categorization 
        GROUP BY recipe_id HAVING COUNT(*) >= 2
    )
  
    SELECT title AS 'Recipe', category_name AS 'Category'
    FROM recipes
    JOIN no_bake_cake_categorization 
    ON recipes.id = no_bake_cake_categorization.recipe_id; `,
    (results) => console.table(results)
  );

  // Print all the vegan and Japanese recipes
  getResults(
    "All the vegan and Japanese recipes:",
    `WITH categorization_category AS (
      SELECT DISTINCT recipe_id, name AS 'category_id' FROM categorization
      JOIN categories ON categorization.category_id = categories.id 
      WHERE name = 'Japanese' OR name = 'Vegan'
    )
    SELECT title AS 'Recipe', category_id AS 'Category'
    FROM recipes
    JOIN categorization_category ON
    recipes.id = categorization_category.recipe_id;`,
    (results) => console.table(results)
  );
};

export default printAssignments;
