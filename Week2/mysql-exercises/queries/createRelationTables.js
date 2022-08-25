import db from "../db.js";
import log from "../utils/log.js";
const createRelationTables = ({ isPrinting = false }) => {
  // MENTORSHIP
  db.query(
    `CREATE TABLE mentorship (
      mentor_id INTEGER NOT NULL,
      protege_id INTEGER NOT NUll UNIQUE,
      FOREIGN KEY (mentor_id) REFERENCES authors(id),
      FOREIGN KEY (protege_id) REFERENCES authors(id),
      PRIMARY KEY (mentor_id, protege_id),
      CHECK (mentor_id <> protege_id)
  );`,
    (err) => {
      if (err) throw err;
      if (isPrinting) log.green("++ Create relational table 'mentorship'");
    }
  );

  // PUBLISHMENT
  db.query(
    `CREATE TABLE publishment (
          paper_id INT NOT NUll,
          author_id INT NOT NULL,
          FOREIGN KEY (paper_id) REFERENCES papers(id),
          FOREIGN KEY (author_id) REFERENCES authors(id),
          PRIMARY KEY (paper_id, author_id)
      );`,
    (err) => {
      if (err) throw err;
      if (isPrinting) log.green("++ Create relational table 'publishment'");
    }
  );
};

export default createRelationTables;
