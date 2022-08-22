import mysql from "mysql";
import dotenv from "dotenv";
import invitees from "./invitees.js";
import rooms from "./rooms.js";
import meetings from "./meetings.js";
dotenv.config();

const { MYSQL_HOST, MYSQL_USERNAME, MYSQL_PASSWORD } = process.env;

const connection = mysql.createConnection({
  user: MYSQL_USERNAME,
  host: MYSQL_HOST,
  password: MYSQL_PASSWORD,
});

const dbName = "meetup";

connection.connect((err) => {
  if (err) return console.error("error connecting: " + err.stack);
  console.log("connected as id " + connection.threadId);
});

connection.query(
  `DROP DATABASE IF EXISTS ${dbName};`,
  (error, results, fields) => {
    if (error) throw error;
    console.log("Database deleted");
  }
);

connection.query(`CREATE DATABASE ${dbName};`, (error, results, fields) => {
  if (error) throw error;
  console.log(`Database "${dbName}" created`);
});

connection.query(`USE ${dbName};`, (error, results, fields) => {
  if (error) throw error;
  console.log(`Use database "${dbName}"`);
});

connection.query(
  `CREATE TABLE Room (
                    room_no INT PRIMARY KEY AUTO_INCREMENT,
                    room_name VARCHAR(255) UNIQUE NOT NULL,
                    floor_number INT NOT NULL
                );`,
  (error, results, fields) => {
    if (error) throw error;
    console.log('Table "Room" created');
  }
);

connection.query(
  `CREATE TABLE Invitee (
                    invitee_no INTEGER PRIMARY KEY AUTO_INCREMENT,
                    invitee_name VARCHAR(255) UNIQUE NOT NULL,
                    invited_by VARCHAR(255) NOT NULL
                );`,
  (error, results, fields) => {
    if (error) throw error;
    console.log('Table "Invitee" created');
  }
);

connection.query(
  `CREATE TABLE Meeting (
                    meeting_no INTEGER PRIMARY KEY AUTO_INCREMENT,
                    meeting_title VARCHAR(255) NOT NULL,
                    starting_time DATETIME,
                    ending_time DATETIME,
                    room_no INT NOT NUll,
                    FOREIGN KEY (room_no)
                        REFERENCES Room(room_no)
                        ON DELETE CASCADE
                );`,
  (error, results, fields) => {
    if (error) throw error;
    console.log('Table "Meeting" created');
  }
);

invitees.forEach((person) => {
  connection.query(
    `INSERT 
                        INTO Invitee(invitee_name, invited_by)
                        VALUES (?, ?);`,
    [person.inviteeName, person.invitedBy],
    (error, results, fields) => {
      if (error) throw error;
      console.log('A record added to "Invitee" table');
    }
  );
});

rooms.forEach((room) => {
  connection.query(
    `INSERT 
                        INTO Room(room_name, floor_number)
                        VALUES (?, ?);`,
    [room.roomName, room.floorNumber],
    (error, results, fields) => {
      if (error) throw error;
      console.log('A record added to "Room" table');
    }
  );
});

meetings.forEach((meeting) => {
  connection.query(
    `INSERT 
            INTO Meeting(meeting_title, starting_time, ending_time, room_no)
            VALUES (?, ?, ?, ?);`,
    [
      meeting.meetingTitle,
      meeting.startingTime,
      meeting.endingTime,
      meeting.roomNo,
    ],
    (error, results, fields) => {
      if (error) throw error;
      console.log('A record added to "Meeting" table');
    }
  );
});

connection.end();
