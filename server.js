const express = require("express");
const Pool = require('pg').Pool
const bodyParser = require('body-parser');
const dotenv = require("dotenv");

dotenv.config()

const PORT = process.env.SERVER_PORT || 80;

const app = express();

app.use(express.static('public'))
app.use(bodyParser.json())

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 5432,
})

app.get("/api/notes", function (req, res) {

    const sql = 'SELECT * FROM notes';

    pool.query(sql, (error, results) => {

        if (error) throw error

        res.status(200).json(results.rows)
    });
});

app.post("/api/notes/save", function (req, res) {

    let { title, content } = req.body;

    if (!title || !content) {
        return res.status(500).json({ error: 'Title and content are required' });
    }

    title = title.trim();
    content = content.trim();

    if (title === "" || !content === "") {
        return res.status(500).json({ error: 'Title and content should not be blank' });
    }

    if (title.length > 50) {
        return res.status(500).json({ error: 'Title should have <= 50 characters' });
    }

    if (content.length > 150) {
        return res.status(500).json({ error: 'Content should have <= 150 characters' });
    }

    const sql = 'INSERT INTO notes (title, content) VALUES ($1, $2)';

    pool.query(sql, [title, content], (error, results) => {

        if (error) {
            console.error('Error creating note:', error);
            return res.status(500).json({ error: 'Failed to create note' });
        }

        res.status(200).json("Note created successfully");
    });
});

app.post("/api/notes/remove", function (req, res) {

    const { id } = req.body;

    if (!id) {
        return res.status(500).json({ error: 'id is required' });
    }

    const sql = "DELETE FROM notes WHERE id = $1;";

    pool.query(sql, [id], (error, results) => {

        if (error) {
            console.error('Error creating note:', error);
            return res.status(500).json({ error: 'Failed to create note' });
        }

        res.status(200).json("Note removed successfully");
    });
});

app.listen(PORT, () => {
    console.log("Listening on port 80");
});
