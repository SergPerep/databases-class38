-- Statemens that I have tested with mysqlsh before putting them in node.js app
DROP DATABASE IF EXISTS scholar;

CREATE DATABASE scholar;

USE scholar;

-- EXERCISE #1: KEYS
CREATE TABLE universities (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE authors (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    university_id INTEGER NOT NULL,
    date_of_birth DATE NOT NULL,
    h_index INTEGER NOT NULL,
    gender ENUM('male', 'female', 'non-binary', 'unknown') NOT NULL,
    FOREIGN KEY (university_id) REFERENCES universities(id)
);

CREATE TABLE papers (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    title VARCHAR(255) UNIQUE NOT NULL, 
    conference VARCHAR(255), 
    publish_date DATE NOT NULL
);

-- EXERCISE #2: RELATIONSHIPS
CREATE TABLE publishment (
    paper_id INT NOT NUll,
    author_id INT NOT NULL,
    FOREIGN KEY (paper_id) REFERENCES papers(id),
    FOREIGN KEY (author_id) REFERENCES authors(id),
    PRIMARY KEY (paper_id, author_id)
);

CREATE TABLE mentorship (
    mentor_id INTEGER NOT NULL,
    protege_id INTEGER NOT NUll UNIQUE,
    FOREIGN KEY (mentor_id) REFERENCES authors(id),
    FOREIGN KEY (protege_id) REFERENCES authors(id),
    PRIMARY KEY (mentor_id, protege_id),
    CHECK (mentor_id <> protege_id)
);

-- INSERTIONS EXAMPLES
INSERT INTO universities(name) 
VALUES ("Massachusetts Institute of Technology");

INSERT INTO papers(title, publish_date, conference) 
VALUES ("Title", "2020-11-11", "ICDSAA 2022: Data Science and Analytics Conference");

INSERT INTO authors(name, university_id, date_of_birth, h_index, gender)
VALUES ("John", 1, "2003-10-16", 19, "male");

INSERT INTO mentorship(mentor_id, protege_id)
VALUES (1, 2);

INSERT INTO publishment(paper_id, author_id) VALUES(1, 1);

-- EXERCISE #3: JOINS
-- Write a query that prints names of all authors and their corresponding mentors.
WITH prev_res AS (
    SELECT name as 'authors_name', protege_id, mentor_id FROM authors 
    LEFT JOIN mentorship ON authors.id = mentorship.protege_id
)

SELECT authors_name AS 'Protege', 
CASE
    WHEN authors.name IS NULL
    THEN '-'
    ELSE authors.name
END
AS 'Mentor'
FROM prev_res 
LEFT JOIN authors ON mentor_id = authors.id;

-- Write a query that prints all columns of authors and their published paper_title. 
-- If there is an author without any research_Papers, print the information of that author too.

WITH prev_res AS (
    SELECT author_id, title FROM publishment
    JOIN papers ON paper_id = papers.id
)

SELECT id, name, university_id, date_of_birth, h_index, gender, title as 'paper' FROM authors 
LEFT JOIN prev_res ON id = author_id;

-- EXERCISE #4: AGGREGATIVE FUNCTIONS
-- All research papers and the number of authors that wrote that paper.
WITH prev_res AS(
    SELECT paper_id, name FROM publishment JOIN authors ON authors.id = author_id
)

SELECT title AS "Research paper", COUNT(*) AS 'Number of authors' FROM papers
LEFT JOIN prev_res ON id = paper_id GROUP BY title;

-- Sum of the research papers published by all female authors.
SELECT COUNT(DISTINCT paper_id) AS 'sum' FROM publishment 
JOIN authors ON author_id = authors.id 
WHERE authors.gender = "female";

-- Average of the h-index of all authors per university.
SELECT universities.name AS 'University', ROUND(AVG(h_index), 0) AS 'h-index' FROM universities
JOIN authors ON authors.university_id = universities.id GROUP BY universities.name;

-- Sum of the research papers of the authors per university.

WITH uni_authors AS(
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
GROUP BY university;

-- Minimum and maximum of the h-index of all authors per university.
SELECT universities.name AS 'University', MIN(h_index) AS 'Min h-index', MAX(h_index) AS 'Max h-index'
FROM universities
JOIN authors ON authors.university_id = universities.id 
GROUP BY universities.name;




