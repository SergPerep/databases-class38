# 3.1. Exercise 1 : Normalization

The manager of the dinner club would like to manage the information system that assists him to keep track of the dinners had by members. Because the manager is not an expert of Information Systems, (s)he uses the following table to store the information. Please help the manger by using the knowledge of database normal forms. Save all answers in a text file / MD file.

```plaintext
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
| member_id | member_name   | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
|         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1, C2    | Curry, Cake      |
|         2 | Ben           | 24 Hudson lane | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         3 | Cristina      | 516 6th Ave    | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         4 | Dan           | 89 John St     | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         1 | Amit          | 325 Max park   | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         3 | Cristina      | 516 6th Ave    | D00001004 | Mar 25 '20  | B04        | Mama's Kitchen    | F1, M1    | Falafal, Mousse  |
|         5 | Gabor         | 54 Vivaldi St  | D00001005 | Mar 26 '20  | B05        | Hungry Hungary    | G1, P2    | Goulash, Pasca   |
|         6 | Hema          | 9 Peter St     | D00001003 | 01-04-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
```

1. What columns violate 1NF?
  
    - `food_code` and `food_description` contain several values
    - `dinner_date` holds values of different types

1. What entities do you recognize that could be extracted?

    - members
    - dinners
    - venues
    - food (foods)

1. Name all the tables and columns that would make a 3NF compliant solution.

    - members
      - id
      - name
      - address
    - dinners
      - id
      - date
      - member_id
      - venue_code
      - dinner_composition_id
    - venues
      - code
      - description (name)
    - food (foods)
      - code
      - description
    - dinner_composition
      - dinner_id
      - food_code
