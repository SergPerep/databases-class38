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

ALTER TABLE authors
    ADD COLUMN mentor INTEGER,
    ADD FOREIGN KEY (mentor) REFERENCES authors(id);

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

INSERT INTO authors(name, university_id, date_of_birth, h_index, gender)
VALUES ("Ann", 1, "2003-10-16", 34, "female");

UPDATE authors SET mentor = 4 WHERE id = 1;

INSERT INTO mentorship(mentor_id, protege_id)
VALUES (1, 2);

INSERT INTO publishment(paper_id, author_id) VALUES(1, 1);

-- EXERCISE #3: JOINS
-- Write a query that prints names of all authors and their corresponding mentors.
SELECT a.name AS 'Protege', 
    CASE 
        WHEN a.mentor IS NULL
            THEN '-'
        ELSE m.name 
    END AS "Mentor"
FROM authors a 
LEFT JOIN authors m 
ON a.mentor = m.id;

-- Write a query that prints all columns of authors and their published paper_title. 
-- If there is an author without any research_Papers, print the information of that author too.

SELECT authors.id as 'Id', name as 'Author', university_id, date_of_birth, h_index, gender, mentor, title AS 'Paper'
FROM authors 
LEFT JOIN (
    SELECT author_id, id, title 
    FROM publishment 
    LEFT JOIN papers 
    ON publishment.paper_id = papers.id
    ) AS p
ON authors.id = p.author_id;


-- EXERCISE #4: AGGREGATIVE FUNCTIONS
-- All research papers and the number of authors that wrote that paper.
SELECT title AS "Research paper", COUNT(author_id) AS "Number of authors"
FROM papers 
LEFT JOIN publishment ON publishment.paper_id = papers.id 
GROUP BY id;

-- Sum of the research papers published by all female authors.
SELECT COUNT(DISTINCT paper_id) AS 'sum' FROM publishment 
JOIN authors ON author_id = authors.id 
WHERE authors.gender = "female";

-- Average of the h-index of all authors per university.
SELECT universities.name AS 'University', ROUND(AVG(h_index), 0) AS 'h-index' FROM universities
JOIN authors ON authors.university_id = universities.id GROUP BY universities.name;

-- Sum of the research papers of the authors per university.

SELECT universities.name AS 'University', COUNT(paper_id) AS 'Number of papers'
FROM universities
LEFT JOIN (
    SELECT id, name, university_id, paper_id 
    FROM authors
    JOIN publishment 
    ON publishment.author_id = authors.id
) AS a 
ON universities.id = a.university_id
GROUP BY universities.name;



-- Minimum and maximum of the h-index of all authors per university.
SELECT universities.name AS 'University', MIN(h_index) AS 'Min h-index', MAX(h_index) AS 'Max h-index'
FROM universities
JOIN authors ON authors.university_id = universities.id 
GROUP BY universities.name;




