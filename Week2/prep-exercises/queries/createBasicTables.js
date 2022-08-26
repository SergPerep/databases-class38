import db from "../db.js";
import log from "../utils/log.js";
const createBasicTables = ({ isPrinting = false }) => {
  // CATEGORIES
  db.query(
    `CREATE TABLE categories (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) UNIQUE NOT NULL 
    );`,
    (err) => {
      if (err) throw err;
      if (isPrinting) log.green("++ Create basic table 'categories'");
    }
  );

  // STEPS
  db.query(
    `CREATE TABLE steps (
        id INT PRIMARY KEY AUTO_INCREMENT,
        description VARCHAR(255) UNIQUE NOT NULL
    );`,
    (err) => {
      if (err) throw err;
      if (isPrinting) log.green("++ Create basic table 'steps'");
    }
  );

  // INGREDIENTS
  db.query(
    `CREATE TABLE ingredients (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) UNIQUE NOT NULL
    );`,
    (err) => {
      if (err) throw err;
      if (isPrinting) log.green("++ Create basic table 'ingredients'");
    }
  );
  // RECIPES
  db.query(
    `CREATE TABLE recipes (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) UNIQUE NOT NULL
    );`,
    (err) => {
      if (err) throw err;
      if (isPrinting) log.green("++ Create basic table 'recipes'");
    }
  );
};

export default createBasicTables;
