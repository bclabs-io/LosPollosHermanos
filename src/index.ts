import express from 'express';
import { fileURLToPath } from 'url';
import * as path from 'path';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/employee.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));