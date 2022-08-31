DROP DATABASE IF EXISTS transactions;

CREATE DATABASE transactions;

USE transactions;

CREATE TABLE accounts (
    account_number INT PRIMARY KEY AUTO_INCREMENT,
    balance DECIMAL(12, 2) NOT NULL
);

CREATE TABLE account_changes (
    change_number INT PRIMARY KEY AUTO_INCREMENT,
    account_number INT NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    changed_date DATE NOT NULL,
    remark VARCHAR(255),
    FOREIGN KEY (account_number) REFERENCES accounts(account_number)
);

INSERT INTO accounts (balance) 
VALUES (3762);

INSERT INTO account_changes (account_number, amount, changed_date, remark)
VALUES (1, 123.2, '2022-08-31', 'Bought a book');

-- TRANSACTION
START TRANSACTION;

INSERT INTO account_changes (account_number, amount, changed_date, remark)
VALUES (101, -1000, '2022-08-31', 'A gift');

UPDATE accounts SET balance = balance - 1000 WHERE account_number = 101;
INSERT INTO account_changes (account_number, amount, changed_date, remark)
VALUES (102, 1000, '2022-08-31', '');

UPDATE accounts SET balance = balance + 1000 WHERE account_number = 102;

COMMIT;


