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
    `WITH prev_res AS (
        SELECT name as 'authors_name', protege_id, mentor_id FROM authors 
        LEFT JOIN mentorship ON authors.id = mentorship.protege_id
    )
  
    SELECT authors_name AS 'Protege', 
    CASE
        WHEN authors.name IS NULL THEN '-'
        ELSE authors.name
    END
    AS 'Mentor'
    FROM prev_res 
    LEFT JOIN authors ON mentor_id = authors.id;`,
    (results) => console.table(results)
  );

  // Print all columns of authors and their published paper_title.
  // If there is an author without any research_Papers, print the information of that author too.
  getResults(
    "All columns of authors and their published paper_title:",
    `WITH prev_res AS (
      SELECT author_id, title FROM publishment
      JOIN papers ON paper_id = papers.id
    )

    SELECT id, name, university_id, date_of_birth, h_index, gender, title AS 'research_paper' FROM authors 
    LEFT JOIN prev_res ON id = author_id;`,
    (results) => console.table(results)
  );

  // Print all research papers and the number of authors that wrote that paper
  getResults(
    "All research papers and the number of authors that wrote that paper:",
    `WITH prev_res AS(
      SELECT paper_id, name FROM publishment JOIN authors ON authors.id = author_id
    )
  
    SELECT title AS "Research paper", COUNT(*) AS 'Number of authors' FROM papers
    LEFT JOIN prev_res ON id = paper_id GROUP BY title;`,
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
    `WITH uni_authors AS(
      SELECT universities.name AS 'University', authors.id AS 'author_id', authors.name AS 'Authors'
      FROM universities 
      JOIN authors 
      ON authors.university_id = universities.id
    ), authors_papers AS(
        SELECT author_id, COUNT(paper_id) AS 'number_of_papers'
        FROM publishment 
        GROUP BY author_id
    )
  
    SELECT university, SUM(number_of_papers) AS 'Number of papers' FROM uni_authors 
    JOIN authors_papers ON uni_authors.author_id = authors_papers.author_id
    GROUP BY university;`,
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
