CREATE TABLE store (
                          sId INT AUTO_INCREMENT PRIMARY KEY,
    -- Coordinate
                          latitude DECIMAL(10,7) NOT NULL,
                          longitude DECIMAL(10,7) NOT NULL,
    -- Address
                          storeName VARCHAR(100) UNIQUE,
                          state VARCHAR(100) NOT NULL,
                          city VARCHAR(100) NOT NULL,
                          address VARCHAR(255) NOT NULL,
                          zipcode VARCHAR(20) NOT NULL,
    -- Opening Hours
                          weekday VARCHAR(100) NOT NULL,
                          open_time TIME NOT NULL,
                          close_time TIME NOT NULL
);
-- CREATE
    INSERT INTO
        store (latitude, longitude, storeName, state, city, address, zipcode,weekday, open_time, close_time)
    VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
-- READ
    -- GET ALL
    SELECT * FROM store;
    -- GET BY ID
    SELECT * FROM store WHERE sId;
    -- GET BY NAME AND OTHERS
    SELECT * FROM store
             WHERE
                 storeName = ? OR city=? OR state=? OR address=?;
-- UPDATE
    -- UPDATE BY ID
    UPDATE store
    SET
        latitude = ?,
        longitude = ?,
        storeName = ?,
        state = ?,
        city = ?,
        address = ?,
        zipcode = ?,
        weekday = ?,
        open_time = ?,
        close_time = ?
    WHERE sId = ?;
-- DELETE
    DELETE FROM store WHERE sId = ?;
-- OTHERS
    -- GET ALL EMPLOYEES IN A STORE
    SELECT * FROM employee WHERE store = ?;
    -- COUNT OF EMPLOYEES IN A STORE
    SELECT COUNT(*) FROM employee WHERE store = ?;
    -- GET STORES IN A CITY
    SELECT * FROM store WHERE city = ?;
    -- GET STORES IN A STATE
    SELECT * FROM store WHERE state = ?;
    -- GET COORDINATION OF SPECIFIC STORE (FOR MAP PURPOSE)
    SELECT latitude, longitude FROM store WHERE sId = ?;