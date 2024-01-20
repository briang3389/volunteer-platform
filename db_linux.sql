CREATE EXTENSION IF NOT EXISTS "pg_trgm";

SET pg_trgm.similarity_threshold = 0.7;

CREATE TABLE IF NOT EXISTS Users (
    userid SERIAL,
    username VARCHAR(32) UNIQUE NOT NULL,
    email VARCHAR(32) NOT NULL,
    password VARCHAR(255) NOT NULL,
    icon_url VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (userid)
);

CREATE INDEX user_search_index ON Users USING GIST (name gist_trgm_ops);

CREATE TABLE IF NOT EXISTS Organizations (
    orgid SERIAL,
    name VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    description TEXT NOT NULL,
    icon_url VARCHAR(255) NOT NULL,
    PRIMARY KEY (orgid)
);

CREATE INDEX org_search_index ON Organizations USING GIST (name gist_trgm_ops);

CREATE TABLE IF NOT EXISTS Events (
    eventid SERIAL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    startdate DATE NOT NULL,
    enddate DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    orgid INT NOT NULL REFERENCES Organizations(orgid),
    icon_url VARCHAR(255) NOT NULL,
    PRIMARY KEY (eventid)
);

CREATE INDEX event_search_index ON Events USING GIST (name gist_trgm_ops);

CREATE TABLE IF NOT EXISTS EventLog (
    eventid INT NOT NULL REFERENCES Events(eventid),
    userid INT NOT NULL REFERENCES Users(userid),
    orgid INT NOT NULL REFERENCES Organizations(orgid),
    hours INT NOT NULL,
    verified BOOLEAN NOT NULL,
    date DATE NOT NULL
);

-- INSERT INTO Links (url, path) VALUES ('https://www.google.com', 'google'); -- test

