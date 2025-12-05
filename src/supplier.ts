import express from 'express';
import connection from './ConnectToDB.ts';

const sRouter = express.Router();

/**
 * POST /api/supplier/add
 * 新增一筆供應商資料
 */
sRouter.post('/add', (req, res) => {
    console.log("received supplier data:", req.body);

    const {
        name,
        contactPerson,
        email,
        phone,
        productType,
        city,
        address,
        notes
    } = req.body;

    if (!name) {
        return res.status(400).json({ success: false, error: "Supplier name is required" });
    }

    const sql = `
        INSERT INTO supplier
        (name, contact_person, email, phone, product_type, city, address, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
        name,
        contactPerson || null,
        email || null,
        phone || null,
        productType || null,
        city || null,
        address || null,
        notes || null
    ];

    connection.query(sql, params, (err, result) => {
        if (err) {
            console.error("MySQL error:", err);
            return res.status(500).json({ success: false, error: "Database error" });
        }

        res.json({ success: true, id: result.insertId });
    });
});

/**
 * GET /api/supplier/getAll
 * 取得所有供應商資料
 */
sRouter.get('/getAll', (req, res) => {
    const sql = 'SELECT * FROM supplier';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error("MySQL error:", err);
            return res.status(500).json({ success: false, error: "Database error" });
        }
        res.json(results);
    });
});

export default sRouter;
