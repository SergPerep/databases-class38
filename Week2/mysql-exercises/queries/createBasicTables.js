import db from "../db.js";
import log from "../utils/log.js";
const createBasicTables = ({ isPrinting = false }) => {
  // UNIVERSITIES
  db.query(
    `CREATE TABLE universities (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) UNIQUE NOT NULL
  );`,
    (err) => {
      if (err) throw err;
      if (isPrinting) log.green("++ Create basic table 'universities'");
    }
  );

  // AUTHORS
  db.query(
    `CREATE TABLE authors (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(255) NOT NULL,
          university_id INTEGER NOT NULL,
          date_of_birth DATE NOT NULL,
          h_index INTEGER NOT NULL,
          gender ENUM('male', 'female', 'non-binary', 'unknown') NOT NULL,
          FOREIGN KEY (university_id) REFERENCES universities(id)
      );`,
    (err) => {
      if (err) throw err;
      if (isPrinting) log.green("++ Create basic table 'authors'");
    }
  );

  // PAPERS
  db.query(
    `CREATE TABLE papers (
          id INT PRIMARY KEY AUTO_INCREMENT, 
          title VARCHAR(255) UNIQUE NOT NULL, 
          conference VARCHAR(255), 
          publish_date DATE NOT NULL
      );`,
    (err) => {
      if (err) throw err;
      if (isPrinting) log.green("++ Create basic table 'papers'");
    }
  );
};

export default createBasicTables;
