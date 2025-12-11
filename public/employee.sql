CREATE TABLE employee (
                          eId INT AUTO_INCREMENT PRIMARY KEY,

    -- Basic Info
                          name VARCHAR(100) NOT NULL,
                          position VARCHAR(100) NOT NULL,

    -- Contact
                          email VARCHAR(100) NOT NULL,
                          phone VARCHAR(50),

    -- Work Location
                          store INT NULL,
                          FOREIGN KEY (store) REFERENCES location(sId) ON DELETE SET NULL,
    -- Hire Information
                          hireDate DATE,
                          type VARCHAR(20)
);
-- CREATE
    INSERT INTO
        employee (name, position, email, phone, store, hireDate, type)
    VALUES
        (?, ?, ?, ?, ?, ?, ?);
-- READ
    -- GET ALL
    SELECT * FROM employee;
    -- GET BY ID
    SELECT * FROM employee WHERE eId = ?;
    -- GET BY NAME AND OTHERS
    SELECT * FROM employee
                WHERE
                    name = ? OR position = ? OR email = ? OR phone = ? OR store = ? OR hireDate = ? OR type = ?;
-- UPDATE
    -- UPDATE BY ID
    UPDATE employee
    SET
        name = ?,
        position = ?,
        email = ?,
        phone = ?,
        store = ?,
        hireDate = ?,
        type = ?
    WHERE eId = ?;
-- DELETE
    DELETE FROM employee WHERE eId = ?;
    -- FIRE ALL UNASSIGNED EMPLOYEES
    DELETE FROM employee WHERE store IS NULL;
-- OTHERS
    -- GET LIST BASED ON POSITION COUNT DESCENDING
    SELECT position, COUNT(*) AS count
    FROM employee
    GROUP BY position
    ORDER BY count DESC;
    -- GET DETAILED LIST ON POSITION DESCENDING
    SELECT *
    FROM employee
    ORDER BY position, eId;
    -- GET DETAILED LIST ON STORE DESCENDING
    SELECT *
    FROM employee
    ORDER BY store, eId;
    -- GET EMPLOYEES HIRED AFTER A CERTAIN DATE
    SELECT * FROM employee WHERE hireDate > ?;
    -- GET EMPLOYEES BY TYPE
    SELECT * FROM employee WHERE type = ?;