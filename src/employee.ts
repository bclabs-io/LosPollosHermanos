import express from 'express';
import connection from './ConnectToDB.ts';

const eRouter = express.Router();

/**
 * POST /api/employee/add
 * 新增一筆員工資料
 */
eRouter.post('/add', (req, res) => {
    console.log("received employee data:", req.body);

    const {
        name,
        position,
        email,
        phone,
        store,
        hireDate,
        type
    } = req.body;

    const sql = `
        INSERT INTO employee (
            name, position, email,
            phone, store, hireDate, type
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [name, position, email, phone, store, hireDate, type];

    connection.query(sql, params, (err, result) => {
        if (err) {
            console.error("MySQL error:", err);
            return res.status(500).json({ success: false, error: "Database error" });
        }
        res.json({ success: true, id: result.insertId });
    });
});

/**
 * GET /api/employee/getAll
 * 取得所有員工
 */
eRouter.get('/getAll', (req, res) => {
    const sql = 'SELECT * FROM employee';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error("MySQL error:", err);
            return res.status(500).json({ success: false, error: "Database error" });
        }
        // 直接把 rows 回傳，前端的 employee.js 會用 emp.name / emp.position ... 來讀
        res.json(results);
    });
});

export default eRouter;
