-- create database volunteer;

-- Connect to the database
-- \c volunteer;

CREATE TABLE IF NOT EXISTS Users (
    userid SERIAL,
    username VARCHAR(32) NOT NULL,
    email VARCHAR(32) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (userid)
);

CREATE TABLE IF NOT EXISTS Organizations (
    orgid SERIAL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY (orgid)
);

CREATE TABLE IF NOT EXISTS Events (
    eventid SERIAL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    startdate DATE NOT NULL,
    enddate DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    orgid INT NOT NULL REFERENCES Organizations(orgid),
    PRIMARY KEY (eventid)
);

CREATE TABLE IF NOT EXISTS EventLog (
    eventid INT NOT NULL REFERENCES Events(eventid),
    userid INT NOT NULL REFERENCES Users(userid),
    hours INT NOT NULL,
    verified BOOLEAN NOT NULL,
    date DATE NOT NULL
);

-- INSERT INTO Links (url, path) VALUES ('https://www.google.com', 'google'); -- test

