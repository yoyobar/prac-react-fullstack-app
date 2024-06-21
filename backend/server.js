const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

// SERVER
const app = express();

// MIDDLEWARE
app.use(bodyParser.json());

// GET API
app.get('/api/values', function (req, res) {
    db.pool.query('DESC lists', (err, results) => {
        if (err) console.log(err);
    });

    db.pool.query('SELECT * FROM lists;', (err, results) => {
        if (err) {
            console.error('Database query failed:', err);
            return res.status(500).send(err);
        } else {
            return res.json(results);
        }
    });
});

// POST API
app.post('/api/value', function (req, res) {
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`, (err, results) => {
        if (err) {
            console.error('Database insert failed:', err);
            return res.status(500).send(err);
        } else {
            res.json({ success: true, value: req.body.value });
        }
    });
});

// SERVER RUN
app.listen(5000, () => {
    console.log('서버 가동중, 5000 PORT');
});
