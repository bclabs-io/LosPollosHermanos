import express from 'express';
import connection from './ConnectToDB.ts';
const lRouter = express.Router();
//api/location/add
lRouter.post('/add', (req, res) => {
    console.log("received data:", req.body);
    const {
        latitude,
        longitude,
        city,
        address,
        zipcode,
        days,
        open_time,
        close_time
    } = req.body;
    const flags = {
        mon: days[0],
        tue: days[1],
        wed: days[2],
        thu: days[3],
        fri: days[4],
        sat: days[5],
        sun: days[6],
    };
    const sql = `
        INSERT INTO location (
            latitude, longitude,
            city, address, zipcode,
            mon, tue, wed, thu, fri, sat, sun,
            open_time, close_time
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
        latitude, longitude,
        city, address, zipcode,
        flags.mon, flags.tue, flags.wed, flags.thu,
        flags.fri, flags.sat, flags.sun,
        open_time, close_time
    ];

    connection.query(sql, params, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ success: true, id: result.insertId });
    });
});
lRouter.get("/getAll", (req, res) => {
    const sql = "SELECT * FROM location";
    connection.query(sql, (err, results) => {
        if (err) {
            console.error("MySQL error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results); // send all rows as JSON
    });
});
export default lRouter;