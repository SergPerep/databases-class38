# Exercise 3 : SQL injection

You are given the below function which returns the population of a specific country from the world database.

```javascript
function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}
```

1. Give an example of a value that can be passed as name and code that would take advantage of SQL-injection and (fetch all the records in the database)
  
    - name = `' OR 1=1; #` returns population for all countries
    - name = `'; SELECT * FROM country; SELECT * FROM city; SELECT * FROM countrylanguage; #` returns all records of the database if multiple queries are allowed

1. Rewrite the function so that it is no longer vulnerable to SQL injection

    ```javascript
    const conn = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        multipleStatements: false
    });

    function getPopulation(country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
        "SELECT Population FROM ? WHERE Name = ? and code = ?;",
        [country, name, code],
        function (err, result) {
            if (err) cb(err);
            if (result.length == 0) cb(new Error("Not found"));
            cb(null, result[0].name);
        }
    );
    }
    ```
