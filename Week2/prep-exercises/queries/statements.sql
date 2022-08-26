DROP DATABASE IF EXISTS cookbook;

CREATE DATABASE cookbook;

USE cookbook;

-- CREATE BASIC TABLES
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL 
);

CREATE TABLE steps (
    id INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE ingredients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE recipes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) UNIQUE NOT NULL
);

-- CREATE RELATION TABLES
CREATE TABLE categorization (
    recipe_id INT NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (category_id) REFERENCES categories(id),
    PRIMARY KEY (recipe_id, category_id)
);

CREATE TABLE composition (
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
    PRIMARY KEY (recipe_id, ingredient_id)
);

CREATE TABLE step_order (
    recipe_id INT NOT NULL,
    step_index INT NOT NULL,
    step_id INT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (step_id) REFERENCES steps(id),
    PRIMARY KEY (recipe_id, step_id, step_index),
    CONSTRAINT unique_combination UNIQUE(recipe_id, step_index)
);

-- INSERTION EXAMPLES
INSERT INTO categories (name) VALUES ("Cake");

INSERT INTO steps (description) VALUES ("Beat Cream Cheese");

INSERT INTO ingredients (name) VALUES ("Condensed milk");

INSERT INTO recipes (title) VALUES ("No-Bake Cheesecake");

INSERT INTO categorization (recipe_id, category_id) VALUES (1, 1);

INSERT INTO composition (recipe_id, ingredient_id) VALUES (1, 1);

INSERT INTO step_order (recipe_id, step_index, step_id) VALUES (1, 1, 1);

-- ASSIGNMENTS

-- Print all the vegetarian recipes with salt

WITH recipes_categorization AS (
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
ON recipes_categories.recipe_id = composition_ingredients.recipe_id;

-- Print all the cakes that do not need baking

WITH categories_categorization AS (
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
ON recipes.id = no_bake_cake_categorization.recipe_id; 

-- Print all the vegan and Japanese recipes
WITH categorization_category AS (
    SELECT DISTINCT recipe_id, name AS 'category_id' FROM categorization
    JOIN categories ON categorization.category_id = categories.id 
    WHERE name = 'Japanese' OR name = 'Vegan'
)
SELECT title AS 'Recipe', category_id AS 'Category'
FROM recipes
JOIN categorization_category ON
recipes.id = categorization_category.recipe_id;
