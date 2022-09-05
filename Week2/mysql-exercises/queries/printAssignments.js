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
  // Print names of all authors and their corresponding mentors
  getResults(
    "Names of all authors and their corresponding mentors:",
    `SELECT a.name AS 'Protege', 
        CASE 
            WHEN a.mentor IS NULL
                THEN '-'
            ELSE m.name 
        END AS "Mentor"
    FROM authors a 
    LEFT JOIN authors m 
    ON a.mentor = m.id;`,
    (results) => console.table(results)
  );

  // Print all columns of authors and their published paper_title.
  // If there is an author without any research_Papers, print the information of that author too.
  getResults(
    "All columns of authors and their published paper_title:",
    `SELECT authors.id as 'Id', name as 'Author', university_id, date_of_birth, h_index, gender, mentor, title AS 'Paper'
      FROM authors 
      LEFT JOIN (
          SELECT author_id, id, title 
          FROM publishment 
          LEFT JOIN papers 
          ON publishment.paper_id = papers.id
          ) AS p
      ON authors.id = p.author_id;`,
    (results) => console.table(results)
  );

  // Print all research papers and the number of authors that wrote that paper
  getResults(
    "All research papers and the number of authors that wrote that paper:",
    `SELECT title AS "Research paper", COUNT(author_id) AS "Number of authors"
      FROM papers 
      LEFT JOIN publishment ON publishment.paper_id = papers.id 
      GROUP BY id;`,
    (results) => console.table(results)
  );
  // Print sum of the research papers published by all female authors
  getResults(
    "Sum of the research papers published by all female authors:",
    `SELECT COUNT(DISTINCT paper_id) AS 'sum' FROM publishment 
    JOIN authors ON author_id = authors.id 
    WHERE authors.gender = "female";`,
    (results) => console.log(results[0].sum)
  );

  // Print average of the h-index of all authors per university.
  getResults(
    "Average of the h-index of all authors per university:",
    `SELECT universities.name AS 'University', ROUND(AVG(h_index), 0) AS 'h-index' FROM universities
    JOIN authors ON authors.university_id = universities.id GROUP BY universities.name;`,
    (results) => console.table(results)
  );

  // Print sum of the research papers of the authors per university
  getResults(
    "Sum of the research papers of the authors per university:",
    `SELECT universities.name AS 'University', COUNT(paper_id) AS 'Number of papers'
      FROM universities
      LEFT JOIN (
          SELECT id, name, university_id, paper_id 
          FROM authors
          JOIN publishment 
          ON publishment.author_id = authors.id
      ) AS a 
      ON universities.id = a.university_id
      GROUP BY universities.name;`,
    (results) => console.table(results)
  );

  // Print minimum and maximum of the h-index of all authors per university
  getResults(
    "Minimum and maximum of the h-index of all authors per university:",
    `SELECT universities.name AS 'University', MIN(h_index) AS 'Min h-index', MAX(h_index) AS 'Max h-index'
      FROM universities
      JOIN authors ON authors.university_id = universities.id 
      GROUP BY universities.name;`,
    (results) => console.table(results)
  );
};

export default printAssignments;
