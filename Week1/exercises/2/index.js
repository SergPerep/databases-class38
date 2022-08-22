import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const { MYSQL_HOST, MYSQL_USERNAME, MYSQL_PASSWORD } = process.env;

const connection = mysql.createConnection({
  user: MYSQL_USERNAME,
  host: MYSQL_HOST,
  password: MYSQL_PASSWORD,
  database: "new_world",
});

connection.connect((err) => {
  if (err) return console.error("error connecting: " + err.stack);
  console.log("connected as id " + connection.threadId);
});

const getResults = (title = "title", query, callback) => {
  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    const titleColor = "\x1b[2m%s\x1b[0m";
    console.log(titleColor, "\n" + title.toUpperCase());
    callback(results);
  });
};

// 1. What are the names of countries with population greater than 8 million?
getResults(
  "1. What are the names of countries with population greater than 8 million?",
  "SELECT name FROM country WHERE population > 8000000;",
  (results) => {
    results.forEach((country, index) => {
      console.log(`${index + 1}. ${country.name}`);
    });
  }
);

// 2. What are the names of countries that have “land” in their names?
getResults(
  "2. What are the names of countries that have “land” in their names?",
  "SELECT name FROM country WHERE name LIKE '%land%';",
  (results) => {
    results.forEach((country, index) => {
      console.log(`${index + 1}. ${country.name}`);
    });
  }
);

// 3. What are the names of the cities with population in between 500,000 and 1 million?
getResults(
  "3. What are the names of the cities with population in between 500,000 and 1 million?",
  "SELECT name FROM country WHERE population BETWEEN 500000 AND 1000000;",
  (results) => {
    results.forEach((city, index) => {
      console.log(`${index + 1}. ${city.name}`);
    });
  }
);

// 4. What's the name of all the countries on the continent ‘Europe’?
getResults(
  "4. What's the name of all the countries on the continent 'Europe'?",
  "SELECT name FROM country WHERE continent = 'Europe';",
  (results) => {
    results.forEach((country, index) => {
      console.log(`${index + 1}. ${country.name}`);
    });
  }
);

// 5. List all the countries in the descending order of their surface areas.
getResults(
  "5. List all the countries in the descending order of their surface areas.",
  "SELECT name FROM country ORDER BY surfacearea DESC;",
  (results) => {
    results.forEach((country, index) => {
      console.log(`${index + 1}. ${country.name}`);
    });
  }
);

// 6. What are the names of all the cities in the Netherlands?
getResults(
  "6. What are the names of all the cities in the Netherlands?",
  "SELECT name FROM city WHERE countrycode='NLD';",
  (results) => {
    results.forEach((city, index) => {
      console.log(`${index + 1}. ${city.name}`);
    });
  }
);

// 7. What is the population of Rotterdam?
getResults(
  "7. What is the population of Rotterdam?",
  "SELECT population FROM city WHERE name='Rotterdam';",
  (results) => console.log(results[0].population)
);

// 8. What's the top 10 countries by Surface Area?
getResults(
  "8. What's the top 10 countries by Surface Area?",
  "SELECT name FROM country ORDER BY surfacearea DESC LIMIT 10;",
  (results) => {
    results.forEach((country, index) => {
      console.log(`${index + 1}. ${country.name}`);
    });
  }
);

// 9. What's the top 10 most populated cities?
getResults(
  "9. What's the top 10 most populated cities?",
  "SELECT name, population FROM country ORDER BY population DESC LIMIT 10;",
  (results) => {
    results.forEach((city, index) => {
      console.log(`${index + 1}. ${city.name}`);
    });
  }
);

// 10. What is the population number of the world?
getResults(
  "10. What is the population number of the world?",
  "SELECT SUM(population) AS total_population FROM country ;",
  (results) => console.log(results[0].total_population)
);

connection.end();
