DROP DATABASE IF EXISTS meetup;

CREATE DATABASE meetup;

USE meetup;

CREATE TABLE Room (
    room_no INT PRIMARY KEY AUTO_INCREMENT,
    room_name VARCHAR(255) UNIQUE NOT NULL,
    floor_number INT NOT NULL
);


CREATE TABLE Invitee (
    invitee_no INTEGER PRIMARY KEY AUTO_INCREMENT,
    invitee_name VARCHAR(255) UNIQUE NOT NULL,
    invited_by VARCHAR(255) NOT NULL
);

CREATE TABLE Meeting (
    meeting_no INTEGER PRIMARY KEY AUTO_INCREMENT,
    meeting_title VARCHAR(255) NOT NULL,
    starting_time DATETIME,
    ending_time DATETIME,
    room_no INT NOT NUll,
    FOREIGN KEY (room_no)
        REFERENCES Room(room_no)
        ON DELETE CASCADE
);

INSERT 
    INTO Invitee(invitee_name, invited_by)
    VALUES ("Jack", "Anna");

INSERT 
    INTO Room(room_name, floor_number)
    VALUES ('Red room', 2);

INSERT 
    INTO Meeting(meeting_title, starting_time, ending_time, room_no)
    VALUES ("Cookies", "2022-08-21 12:00:00", "2022-08-21 15:00:00", 1);