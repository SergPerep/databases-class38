import db from "../db.js";
import log from "../utils/log.js";
import authors from "../mock-data/authors.js";
import mentorship from "../mock-data/mentorship.js";
import papers from "../mock-data/papers.js";
import publishment from "../mock-data/publishment.js";
import universities from "../mock-data/universities.js";
const fillUpTables = ({ isPrinting = false }) => {
  universities.forEach((university) => {
    db.query(
      "INSERT INTO universities(name) VALUES (?);",
      [university.name],
      (err) => {
        if (err) throw err.stack;
        if (isPrinting) {
          log.basic("-> Insert a university:");
          log.dim({ name: university.name });
        }
      }
    );
  });

  papers.forEach((paper) => {
    const { title, publish_date, conference } = paper;
    db.query(
      "INSERT INTO papers(title, publish_date, conference) VALUES (?, ?, ?);",
      [title, publish_date, conference],
      (err) => {
        if (err) throw err.stack;
        if (isPrinting) {
          log.basic("-> Insert a paper:");
          log.dim({ title, publish_date, conference });
        }
      }
    );
  });

  authors.forEach((author) => {
    const { name, university_id, date_of_birth, h_index, gender } = author;
    db.query(
      `INSERT INTO authors(name, university_id, date_of_birth, h_index, gender)
      VALUES (?, ?, ?, ?, ?);`,
      [name, university_id, date_of_birth, h_index, gender],
      (err) => {
        if (err) throw err.stack;
        if (isPrinting) {
          log.basic("-> Insert an author:");
          log.dim({ name, university_id, date_of_birth, h_index, gender });
        }
      }
    );
  });

  mentorship.forEach((item) => {
    const { mentor_id, protege_id } = item;
    db.query(
      `INSERT INTO mentorship(mentor_id, protege_id)
        VALUES (?, ?);`,
      [mentor_id, protege_id],
      (err) => {
        if (err) throw err.stack;
        if (isPrinting) {
          log.basic("-> Insert a mentorship:");
          log.dim({ mentor_id, protege_id });
        }
      }
    );
  });

  publishment.forEach((item) => {
    const { paper_id, author_id } = item;
    db.query(
      `INSERT INTO publishment(paper_id, author_id) 
        VALUES(?, ?);`,
      [paper_id, author_id],
      (err) => {
        if (err) throw err.stack;
        if (isPrinting) {
          log.basic("-> Insert a publishment:");
          log.dim({ paper_id, author_id });
        }
      }
    );
  });
};

export default fillUpTables;
